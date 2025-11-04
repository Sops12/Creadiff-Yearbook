import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import imagekit from '@/lib/imagekit';

// Helper to get database connection
async function getDb() {
  const client = await clientPromise;
  return client.db();
}

// Validation constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

// Helper function to validate file
function validateFile(file) {
  // Check file exists
  if (!file || !(file instanceof File)) {
    return { valid: false, message: 'File is required' };
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { valid: false, message: 'Only .jpg, .jpeg, and .png files are allowed' };
  }

  // Check file extension
  const fileName = file.name.toLowerCase();
  const hasValidExtension = ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext));
  if (!hasValidExtension) {
    return { valid: false, message: 'Only .jpg, .jpeg, and .png files are allowed' };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, message: 'Max file size is 10 MB' };
  }

  return { valid: true };
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const title = formData.get('title');

    if (!file || !title) {
      return NextResponse.json({ message: 'File and title are required' }, { status: 400 });
    }

    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json({ message: validation.message }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    const uploadResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: file.name,
      folder: '/portfolio',
    });

    const db = await getDb();
    const doc = {
      title,
      imageUrl: uploadResponse.url,
      fileId: uploadResponse.fileId,
      createdAt: new Date(),
    };
    await db.collection('portfolios').insertOne(doc);

    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.error("Error creating portfolio item:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDb();
    const portfolios = await db.collection('portfolios').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(portfolios);
  } catch (error) {
    console.error("Error fetching portfolio items:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const formData = await req.formData();
    const id = formData.get('id');
    const title = formData.get('title');
    const file = formData.get('file');

    if (!id || !title) {
      return NextResponse.json({ message: 'ID and title are required' }, { status: 400 });
    }

    const db = await getDb();
    const objectId = new ObjectId(id);
    const existingItem = await db.collection('portfolios').findOne({ _id: objectId });

    if (!existingItem) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    const updateData = { title };

    if (file) {
      // Validate file
      const validation = validateFile(file);
      if (!validation.valid) {
        return NextResponse.json({ message: validation.message }, { status: 400 });
      }

      // 1. Upload new file to ImageKit
      const buffer = await file.arrayBuffer();
      const fileBuffer = Buffer.from(buffer);
      const uploadResponse = await imagekit.upload({
        file: fileBuffer,
        fileName: file.name,
        folder: '/portfolio',
      });
      
      // 2. Delete old file from ImageKit
      if (existingItem.fileId) {
        await imagekit.deleteFile(existingItem.fileId);
      }

      // 3. Prepare new data for MongoDB
      updateData.imageUrl = uploadResponse.url;
      updateData.fileId = uploadResponse.fileId;
    }

    await db.collection('portfolios').updateOne(
      { _id: objectId },
      { $set: updateData }
    );
    
    return NextResponse.json({ message: 'Item updated successfully' });
  } catch (error) {
    console.error("Error updating portfolio item:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const db = await getDb();
    const objectId = new ObjectId(id);
    
    // 1. Find the item to get the fileId
    const itemToDelete = await db.collection('portfolios').findOne({ _id: objectId });

    if (!itemToDelete) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    // 2. Delete the file from ImageKit
    if (itemToDelete.fileId) {
      await imagekit.deleteFile(itemToDelete.fileId);
    }
    
    // 3. Delete the item from MongoDB
    await db.collection('portfolios').deleteOne({ _id: objectId });
    
    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error("Error deleting portfolio item:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
} 