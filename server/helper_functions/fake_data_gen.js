// const brain = require("brain.js");
// const net = new brain.NeuralNetwork();

// const bedTimeHasher = 2400.0;
// const sleepLengthHasher = 12.0;
// const exerciseTimeHasher = 180.0;
// const caffeineBeforeSleepHasher = 24.0;
// const caloriesHasher = 5000.0;
// const scoreHasher = 1000.0;

let randCalledCount = 0;
const generateRandom = () => {
  return Math.random();
  // return (randCalledCount % 101) / 100.0;
};

const generateInvRandom = () => {
  return 2 * Math.floor(Math.random() + 0.5) - 1;
    // return randCalledCount % 2 ? 1 : -1;
};

const fakeFunctionGenerator = (weight, spread, optimalData) => {
  return () => {
    randCalledCount++;
    const fakeData =
      generateInvRandom() *
        Math.sqrt(((1000 - weight) * (1 - generateRandom())) / spread) +
      optimalData;
    const score = 1000 - spread * (fakeData - optimalData) ** 2;
    return { fakeData, score };
  };
};

const generate_fake_data = (bedTimeNew,sleepLengthNew,exerciseTimeNew,caffeineBeforeSleepNew,caloriesNew, day_behind) => {

  let curDate = new Date();
  curDate.setDate(curDate.getDate()-day_behind);


  const bedTimeGenerator = fakeFunctionGenerator(500, 0.05, bedTimeNew);
  const sleepLengthGenerator = fakeFunctionGenerator(500,200,sleepLengthNew);
  const exerciseTimeGenerator = fakeFunctionGenerator(500,0.1,exerciseTimeNew);
  const caffeineBeforeSleepGenerator = fakeFunctionGenerator(500,100,caffeineBeforeSleepNew);
  const caloriesGenerator = fakeFunctionGenerator(500, 0.001, caloriesNew);

  const bedTime = bedTimeGenerator();
  bedTime.fakeData = Math.round(bedTime.fakeData);
  if (bedTime.fakeData % 100 >= 60) bedTime.fakeData += 60;
  bedTime.fakeData = bedTime.fakeData % 2400;

  const sleepLength = sleepLengthGenerator();
  const exerciseTime = exerciseTimeGenerator();
  const caffeineBeforeSleep = caffeineBeforeSleepGenerator();
  const calories = caloriesGenerator();

  const score =
    0.6 * sleepLength.score +
    0.1 * bedTime.score +
    0.1 * exerciseTime.score +
    0.1 * calories.score +
    0.1 * caffeineBeforeSleep.score;

  const wakeTimeDecimal = (
    Math.round(bedTime.fakeData/100) + 
    Math.round((bedTime.fakeData%100)/60) + 
    sleepLength.fakeData
  ) % 24;

  const wakeTime = Math.round(100 * Math.round(wakeTimeDecimal) + 60 * (wakeTimeDecimal - Math.round(wakeTimeDecimal))); 


  const retObj = {
    bedTime: bedTime.fakeData,
    wakeTime,
    sleepLength: Number(sleepLength.fakeData.toFixed(2)),
    exerciseTime: Math.abs(Math.round(exerciseTime.fakeData)),
    caffeineBeforeSleep: Math.round(caffeineBeforeSleep.fakeData),
    calories: Math.round(calories.fakeData),
    score: Math.round(score),
    date: `${curDate.getFullYear()}-${curDate.getMonth()+1}-${curDate.getDate()}`
  };
  return retObj;
};

module.exports = generate_fake_data;
// console.log(generate_fake_data(2300, 7, 90, 5, 2000));

// const trainingData = [];

// for (let i = 0; i < 1000; i++) {
//   const fake = generate_fake_data(2300, 7, 90, 5, 2000);
//   const toPush = {
//     input: {
//       ...fake
//     },
//     output: {
//       score: fake.score
//     }
//   };

//   delete toPush.input.score;
//   trainingData.push(toPush);
// }

// net.train(trainingData);

// const testObj = {
//   bedTime: 2300 / bedTimeHasher,
//   sleepLength: 4 / sleepLengthHasher,
//   exerciseTime: 90 / exerciseTimeHasher,
//   caffeineBeforeSleep: 5 / caffeineBeforeSleepHasher,
//   calories: 2000 / caloriesHasher
// };
// const output = net.run(testObj);

// console.log(`the average for 1 is ${scoreHasher * output.score}`);