const brain = require("brain.js");
const net = new brain.NeuralNetwork();

const bedTimeHasher = 2400.0;
const sleepLengthHasher = 12.0;
const exerciseTimeHasher = 180.0;
const caffeineBeforeSleepHasher = 24.0;
const caloriesHasher = 5000.0;
const scoreHasher = 1000.0;

let randCalledCount = 0;
const generateRandom = () => {
  // return Math.random();
  return (randCalledCount % 101) / 100.0;
};

const generateInvRandom = () => {
  // return 2 * Math.floor(Math.random() + 0.5) - 1;
    return randCalledCount % 2 ? 1 : -1;
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

const generate_fake_data = (bedTimeNew,sleepLengthNew,exerciseTimeNew,caffeineBeforeSleepNew,caloriesNew) => {
  const bedTimeGenerator = fakeFunctionGenerator(0, 0.005, bedTimeNew);
  const sleepLengthGenerator = fakeFunctionGenerator(0,100,sleepLengthNew);
  const exerciseTimeGenerator = fakeFunctionGenerator(0,0.1,exerciseTimeNew);
  const caffeineBeforeSleepGenerator = fakeFunctionGenerator(0,100,caffeineBeforeSleepNew);
  const caloriesGenerator = fakeFunctionGenerator(0, 0.001, caloriesNew);

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

  const retObj = {
    bedTime: bedTime.fakeData / bedTimeHasher,
    sleepLength: sleepLength.fakeData / sleepLengthHasher,
    exerciseTime: exerciseTime.fakeData / exerciseTimeHasher,
    caffeineBeforeSleep: caffeineBeforeSleep.fakeData / caffeineBeforeSleepHasher,
    calories: calories.fakeData / caloriesHasher,
    score: score / scoreHasher
  };
  return retObj;
};

const trainingData = [];

for (let i = 0; i < 1000; i++) {
  const fake = generate_fake_data(2300, 7, 90, 5, 2000);
  const toPush = {
    input: {
      ...fake
    },
    output: {
      score: fake.score
    }
  };

  delete toPush.input.score;
  trainingData.push(toPush);
}

net.train(trainingData);

const testObj = {
  bedTime: 2300 / bedTimeHasher,
  sleepLength: 4 / sleepLengthHasher,
  exerciseTime: 90 / exerciseTimeHasher,
  caffeineBeforeSleep: 5 / caffeineBeforeSleepHasher,
  calories: 2000 / caloriesHasher
};
const output = net.run(testObj);

console.log(`the average for 1 is ${scoreHasher * output.score}`);