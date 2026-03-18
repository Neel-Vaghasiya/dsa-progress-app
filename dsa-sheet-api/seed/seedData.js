const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const { Topic, Problem } = require('../src/models');
const data = require('./data.json');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');
};

const seed = async () => {
  await connectDB();

  console.log('Clearing existing Topics and Problems...');
  await Problem.deleteMany({});
  await Topic.deleteMany({});

  let totalProblems = 0;

  for (const topicData of data) {
    const { problems, ...topicFields } = topicData;

    const topic = await Topic.create(topicFields);
    console.log(`  ✓ Topic: ${topic.name}`);

    if (problems?.length) {
      const docs = problems.map((p) => ({ ...p, topicId: topic._id }));
      await Problem.insertMany(docs);
      totalProblems += docs.length;
      console.log(`      └─ ${docs.length} problems inserted`);
    }
  }

  console.log(`\nSeeding complete.`);
  console.log(`  Topics  : ${data.length}`);
  console.log(`  Problems: ${totalProblems}`);
};

seed()
  .catch((err) => {
    console.error('Seed failed:', err.message);
    process.exit(1);
  })
  .finally(() => mongoose.disconnect());
