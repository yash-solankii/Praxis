const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const problems = require('./data/problems');
const { Problem } = require('./models/schemas');

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error(' MONGODB_URI is not defined in environment variables');
  process.exit(1);
}


const operation = process.argv[2] || 'default';


const defaultSeed = async () => {
  const existingCount = await Problem.countDocuments();
  
  if (existingCount === 0) {
    console.log('First time seeding - adding all problems...');
    await Problem.insertMany(problems);
    console.log(` Added ${problems.length} problems to MongoDB!`);
  } else {
    console.log(' Checking for new problems to add...');
    let added = 0;
    
    for (const problemData of problems) {
      try {
        await Problem.create(problemData);
        console.log(`Added: ${problemData.title}`);
        added++;
      } catch (error) {
        if (error.code !== 11000) {
          console.error(`Error: ${error.message}`);
        }
      }
    }
    
    if (added === 0) {
      console.log('All problems already exist!');
    } else {
      console.log(`Added ${added} new problems!`);
    }
  }
};

const addNewProblems = async () => {
  console.log('Adding only new problems...');
  let added = 0;
  
  for (const problemData of problems) {
    try {
      await Problem.create(problemData);
      console.log(`Added: ${problemData.title}`);
      added++;
    } catch (error) {
      if (error.code !== 11000) {
        console.error(`Error adding ${problemData.title}: ${error.message}`);
      }
    }
  }
  
  console.log(`Added ${added} new problems!`);
};

const updateExistingProblems = async () => {
  console.log(' Updating existing problems...');
  let updated = 0;
  
  for (const problemData of problems) {
    try {
      const result = await Problem.updateOne(
        { id: problemData.id },
        { $set: problemData },
        { upsert: false }
      );
      
      if (result.modifiedCount > 0) {
        console.log(`Updated: ${problemData.title}`);
        updated++;
      }
    } catch (error) {
      console.error(`Error updating ${problemData.title}: ${error.message}`);
    }
  }
  
  console.log(`Updated ${updated} problems!`);
};

const clearAllProblems = async () => {
  console.log('Clearing all problems...');
  const result = await Problem.deleteMany({});
  console.log(`Removed ${result.deletedCount} problems!`);
};

const resetDatabase = async () => {
  console.log('Resetting database (clear + reseed)...');
  await clearAllProblems();
  await Problem.insertMany(problems);
  console.log(`Reset complete! Added ${problems.length} problems!`);
};


const runSeedOperation = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    
    console.log(`Running operation: ${operation}`);
    
    switch (operation) {
      case 'add':
        await addNewProblems();
        break;
      case 'update':
        await updateExistingProblems();
        break;
      case 'clear':
        await clearAllProblems();
        break;
      case 'reset':
        await resetDatabase();
        break;
      case 'default':
      default:
        await defaultSeed();
        break;
    }
    
    const finalCount = await Problem.countDocuments();
    console.log(`Total problems in database: ${finalCount}`);
    
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};


runSeedOperation();
