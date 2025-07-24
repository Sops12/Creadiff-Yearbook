import clientPromise from '@/lib/mongodb';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export async function POST(req) {
  try {
    // Debug: log content type
    const contentType = req.headers.get('content-type');
    console.log('Content-Type:', contentType);
    
    let body;
    
    if (contentType && contentType.includes('application/json')) {
      try {
        body = await req.json();
        console.log('Received JSON body:', typeof body, body ? Object.keys(body) : 'null');
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        return new Response(JSON.stringify({ error: 'Invalid JSON format' }), { status: 400 });
      }
    } else if (contentType && contentType.includes('multipart/form-data')) {
      // Handle FormData
      try {
        const formData = await req.formData();
        console.log('FormData entries:', Array.from(formData.entries()).map(([key, value]) => [key, typeof value]));
        
        const imageFile = formData.get('file');
        if (imageFile && imageFile instanceof File) {
          const arrayBuffer = await imageFile.arrayBuffer();
          const base64 = Buffer.from(arrayBuffer).toString('base64');
          const mimeType = imageFile.type;
          body = { image: `data:${mimeType};base64,${base64}` };
          console.log('Processed FormData image, mimeType:', mimeType);
        } else {
          console.error('No image file found in FormData or invalid file');
          return new Response(JSON.stringify({ error: 'No image file provided' }), { status: 400 });
        }
      } catch (formDataError) {
        console.error('FormData processing error:', formDataError);
        return new Response(JSON.stringify({ error: 'Failed to process form data' }), { status: 400 });
      }
    } else {
      // Try to get raw text for debugging
      const rawText = await req.text();
      console.log('Raw request body:', rawText.substring(0, 100) + '...');
      return new Response(JSON.stringify({ error: 'Unsupported content type' }), { status: 400 });
    }

    // Validate body exists
    if (!body) {
      console.error('Body is undefined or null');
      return new Response(JSON.stringify({ error: 'No data received' }), { status: 400 });
    }

    const { image } = body;
    
    if (!image) {
      console.error('Image field is missing from body:', body);
      return new Response(JSON.stringify({ error: 'Image data is required' }), { status: 400 });
    }

    // Deteksi format gambar dari base64
    let fileExtension = 'png'; // default
    if (image.startsWith('data:image/jpeg;base64,') || image.startsWith('data:image/jpg;base64,')) {
      fileExtension = 'jpg';
    } else if (image.startsWith('data:image/png;base64,')) {
      fileExtension = 'png';
    }
    
    console.log('Processing image with extension:', fileExtension);
    
    // Upload ke ImageKit
    const uploadResponse = await imagekit.upload({
      file: image,
      fileName: `running-image-${Date.now()}.${fileExtension}`,
      folder: '/running-images'
    });

    // Simpan ke MongoDB
    const client = await clientPromise;
    const db = client.db();
    await db.collection('running_images').insertOne({
      imageUrl: uploadResponse.url,
      imageId: uploadResponse.fileId,
      createdAt: new Date()
    });

    return new Response(JSON.stringify({ success: true, image: uploadResponse }), { status: 200 });
  } catch (error) {
    console.error('Error in POST /api/running-images:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const images = await db.collection('running_images')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify(images), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { imageId } = await req.json();
    if (!imageId) {
      return new Response(JSON.stringify({ error: 'imageId is required' }), { status: 400 });
    }

    // Hapus dari ImageKit
    await imagekit.deleteFile(imageId);

    // Hapus dari MongoDB
    const client = await clientPromise;
    const db = client.db();
    await db.collection('running_images').deleteOne({ imageId });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
} 