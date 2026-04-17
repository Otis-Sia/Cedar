import { db } from './src/lib/firebase';

async function testFirebase() {
  console.log('Testing Firebase Initialization...');
  if (db) {
    console.log('✅ Firestore (db) instance created successfully.');
    console.log('Project ID:', db.app.options.projectId);
  } else {
    console.log('❌ Failed to create Firestore instance.');
  }
}

testFirebase().catch(console.error);
