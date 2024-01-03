const admin = require('firebase-admin');
const path = require('path');

try {
  const serviceAccountPath = path.join(__dirname, './firebase-admin-sdk.json');
  const serviceAccount = require(serviceAccountPath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

} catch (error) {
  console.error("Failed to initialize Firebase admin", error);
  process.exit(1);
}

module.exports = { admin }; 
