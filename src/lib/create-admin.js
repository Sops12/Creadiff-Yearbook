const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const uri = 'mongodb+srv://root:root@creadiff.bjsntbl.mongodb.net/?retryWrites=true&w=majority&appName=creadiff';
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('creadiff');

  const username = 'sopian';
  const password = 'sopianganteng'; // Ganti dengan password yang diinginkan
  const hash = await bcrypt.hash(password, 10);

  await db.collection('admins').insertOne({
    username,
    password: hash,
    createdAt: new Date()
  });

  console.log('Admin user created!');
  await client.close();
}

createAdmin();