const brain = require('brain.js');
const net = new brain.NeuralNetwork();

const hasher = 3000;

const generateRandom = () => {
    return Math.random();
}

const generateInvRandom = () => {
    return (2 * Math.floor(Math.random() + 0.5) - 1);
}

const fakeFunctionGenerator = (weight, spread, optimalData) => {
    return () => {
        const fakeData = (generateInvRandom() * Math.sqrt((1000-weight)*(1-generateRandom())/(spread)) + optimalData);
        const score = 1000-spread*((fakeData-optimalData)**2)
        return {fakeData, score};
    }
}


const generate_fake_data = (bedTimeNew, sleepLengthNew, exerciseTimeNew, caffeineBeforeSleepNew, caloriesNew) => {


    const bedTimeGenerator = fakeFunctionGenerator(700, 0.005, bedTimeNew);
    const sleepLengthGenerator = fakeFunctionGenerator(400, 100, sleepLengthNew);
    const exerciseTimeGenerator = fakeFunctionGenerator(700, 0.1, exerciseTimeNew);
    const caffeineBeforeSleepGenerator = fakeFunctionGenerator(700, 100, caffeineBeforeSleepNew);
    const caloriesGenerator = fakeFunctionGenerator(600, 0.001, caloriesNew);


    const bedTime = bedTimeGenerator();
    bedTime.fakeData = Math.round(bedTime.fakeData);
    if (bedTime.fakeData % 100 >= 60) bedTime.fakeData += 60;
    bedTime.fakeData = bedTime.fakeData % 2400;

    const sleepLength = sleepLengthGenerator();
    const exerciseTime = exerciseTimeGenerator();
    const caffeineBeforeSleep = caffeineBeforeSleepGenerator();
    const calories = caloriesGenerator();

    const score =
        0.4 * sleepLength.score +
        0.2 * bedTime.score +
        0.15 * exerciseTime.score +
        0.1 * calories.score +
        0.15 * caffeineBeforeSleep.score;

    const retObj = {
        bedTime : bedTime.fakeData/hasher,
        sleepLength : sleepLength.fakeData/hasher,
        exerciseTime: exerciseTime.fakeData/hasher,
        caffeineBeforeSleep: caffeineBeforeSleep.fakeData/hasher,
        calories : calories.fakeData/hasher,
        score : score/hasher
    };
    return retObj;
}

const trainingData = [];

for (let i = 0; i < 7; i++) {
    const fake = generate_fake_data(2300, 7, 90, 5, 2000);
    const toPush = {
        input : {
            ...fake,
        },
        output: {
            score: fake.score
        }
    };
    delete toPush.input.score;
    trainingData.push(toPush);
}

// console.log(trainingData);
// net.train(trainingData);

net
  .trainAsync(trainingData)
  .then((res) => {
    // do something with my trained network
    console.log('response is', res);
    const output = net.run({
        bedTime : 2259/hasher,
        sleepLength : 7.5/hasher,
        exerciseTime: 90/hasher,
        caffeineBeforeSleep: 5/hasher,
        calories : 2000/hasher,
    });
    console.log(output);
  })
  .catch(err => console.log(err));