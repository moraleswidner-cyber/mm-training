const admin = require('./node_modules/firebase-admin');
admin.initializeApp({ credential: admin.credential.cert(require('./sa.json')) });
const db = admin.firestore();

async function main() {
  // Read training data
  const trainDoc = await db.collection('nm-training').doc('main').get();
  const trainData = trainDoc.data();

  // Read nutrition data
  const alimentDoc = await db.collection('nm-alimentacion').doc('main').get();
  const alimentData = alimentDoc.data();

  const fs = require('fs');

  fs.writeFileSync('C:/nm-training/training_raw.json', JSON.stringify(trainData, null, 2));
  fs.writeFileSync('C:/nm-training/nutrition_raw.json', JSON.stringify(alimentData, null, 2));

  console.log('Training data keys:', Object.keys(trainData || {}).length);
  console.log('Nutrition data keys:', Object.keys(alimentData || {}).length);
  console.log('Files written successfully.');
}

main().catch(console.error).finally(() => process.exit());
