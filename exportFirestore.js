// exportFirestore.js
// ------------------
// Exports all documents from the Firestore "users" collection
// into a JSON file named profiles.json

const admin = require("firebase-admin");
const fs    = require("fs");

// Load your downloaded service account key
const serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const COLLECTION_NAME = "users";      // Your Firestore collection
const OUTPUT_FILE     = "profiles.json";

async function exportCollection() {
  try {
    const snapshot = await db.collection(COLLECTION_NAME).get();
    const profiles = [];

    snapshot.forEach(doc => {
      profiles.push({
        // Include Firestore ID if you like:
        firebase_uid: doc.id,
        ...doc.data()
      });
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(profiles, null, 2));
    console.log(`✅ Exported ${profiles.length} documents to ${OUTPUT_FILE}`);
  } catch (error) {
    console.error("❌ Error exporting Firestore data:", error);
    process.exit(1);
  }
}

exportCollection();

// Close the Firestore connection