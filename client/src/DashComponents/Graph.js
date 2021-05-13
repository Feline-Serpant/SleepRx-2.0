import React, { useState } from "react";
import { Line } from "react-chartjs-2";

const Graph = (props) => {
  const sleep = props.sleepData;

  //______________________Sorting Data in Chronological Order________________________//
  sleep.sort((a, b) => {
    const bdate = b.date.split("-");
    const adate = a.date.split("-");
    //console.log(adate)
    return adate[0] - bdate[0] || adate[1] - bdate[1] || adate[2] - bdate[2];
  });

  const sleepEntryDate = sleep.map(
    (sleep) =>
      // console.log("mapped", sleep)
      sleep.date
  );

  //______________________________exerciseScore______________________________//
  const exerciseOptimized = (sleep) => {
    let forty = (sleep.score * 40) / 100;
    let twenty = (forty * 20) / 100;
    const sleepEntry = sleep.map(
      (sleep) =>
        // console.log("mapped", sleep)
        sleep.score + twenty
    );
    return sleepEntry;
  };
  //______________________________caffeineScore______________________________//

  const caffeineOptimized = (sleep) => {
    let forty = (sleep.score * 40) / 100;
    let twenty = (forty * 20) / 100;
    const sleepEntry = sleep.map(
      (sleep) =>
        // console.log("mapped", sleep)
        sleep.score + twenty
    );
    return sleepEntry;
  };

  //______________________________calorieScore______________________________//
  const caloriesOptimized = (sleep) => {
    // console.log("sleep entry", sleep);
    const sleepEntry = sleep.map((s) => {
      // console.log("mapped", sleep)
      let ten = (s.score * 10) / 100;
      let twenty = (ten * 20) / 100;
      return s.score + twenty;
    });
    return sleepEntry;
  };

  //______________________________overall sleep______________________________//

  //  const sleepEntryScore = (sleeping) => {

  //   const sleepEntry = sleeping.map((sleeping) => (
  //     // console.log("mapped", sleep)
  //     sleeping.score
  //   ))
  //   return sleepEntry
  // }
  const sleepEntryScore = sleep.map(
    (sleep) =>
      // console.log("mapped", sleep)
      sleep.score
  );

  console.log("sleepEntryScore", sleepEntryScore);

  //const sleepOpt = (sleep) => {
  const sleepOptimized = sleep.map((sleep) => {
    let forty = (sleep.score * 40) / 100;
    let twenty = (forty * 20) / 100;
    // console.log("mapped", sleep)
    return sleep.score + twenty;
  });
  // ))
  // return sleepEntry
  //}

  //const [graph, setGraph] = useState(sleepEntryScoreOverall)
  const sleepEntryScoreOverall = sleep.map(
    (sleep) =>
      // console.log("mapped", sleep)

      sleep.score + (sleep.score * 20) / 100
  );

  const handleClick = (e) => {
    //console.log(e)
    // let habit = e.target.name
    // if(habit === 'hoursSlept'){
    //   return setGraph(sleepOptimized)
    // } else if(habit === 'excercise'){
    //   return setGraph(exerciseOptimized)
    // } else if(habit === 'caffeine'){
    //   return setGraph(caffeineOptimized)
    // } else if(habit === 'calories'){
    //   return setGraph(caloriesOptimized)
    // }
  };
  const data = {
    labels: sleepEntryDate,
    datasets: [
      {
        label: "Current Sleep",
        data: sleepEntryScore,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Optimized Sleep",
        data: caloriesOptimized(sleep),
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  return (
    <div className="">
      <Line className="graph" data={data} />
      <button className="submitButton" name="hoursSlept" onClick={handleClick}>
        Hours Slept
      </button>
      <button className="submitButton" name="caffeine" onClick={handleClick}>
        Caffeine
      </button>
      <button className="submitButton" name="calories" onClick={handleClick}>
        Calories
      </button>
      <button className="submitButton" name="exercise" onClick={handleClick}>
        Exercise
      </button>
    </div>
  );
};

export default Graph;

// const verifyNotNull = (sleep) => {
//     const notNull = []
//     for(let obj in array){
//         if(Object.values(obj) !== null){
//             notNull.push(obj.score)
//         }
//     }
//     return notNull
// }
// const notNull = verifyNotNull(sleep)
//console.log(verifyNotNull)

//console.log("sleep entries", sleepEntryScore)

// import React from 'react'
// import { Line } from "react-chartjs-2";
// const Graph = (props) => {

//     const sleep = props.sleepData
// //dates being sorted to display in timeline properly
//     sleep.sort((a,b)=>{

//       const bdate = b.date.split('-')
//       const adate = a.date.split('-')
//       console.log(adate)
//       return adate[0] - bdate[0] || adate[1] - bdate[1] || adate[2] - bdate[2];
//   })
// //getting just sleep dates
//     const sleepEntryDate = sleep.map((sleep) => (
//         // console.log("mapped", sleep)
//         sleep.date
//   ))
// //getting just score
//   const sleepEntryScore = sleep.map((sleep) => (
//     // console.log("mapped", sleep)
//     sleep.score
// ))
// //optimized the overall sleep score... will break down the optimization by category later, running out of time
// const sleepEntryScoreOptimized = sleep.map((sleep) => (
//     // console.log("mapped", sleep)

//     sleep.score + ( sleep.score * 20 / 100)
// ))
//     // const verifyNotNull = (sleep) => {
//     //     const notNull = []
//     //     for(let obj in array){
//     //         if(Object.values(obj) !== null){

//     //             notNull.push(obj.score)

//     //         }

//     //     }
//     //     return notNull
//     // }
//     // const notNull = verifyNotNull(sleep)
//   //console.log(verifyNotNull)

//   console.log("sleep entries", sleepEntryScore)
// //graph data below sorry guys running out of time we can talk about this if it's unclear
//     const data = {
//         labels: sleepEntryDate,
//         datasets: [
//           {
//             label: "Current Sleep",
//             data: sleepEntryScore,
//             fill: true,
//             backgroundColor: "rgba(75,192,192,0.2)",
//             borderColor: "rgba(75,192,192,1)"
//           },
//           {
//             label: "Optimized Sleep",
//             data: sleepEntryScoreOptimized,
//             fill: false,
//             borderColor: "#742774"
//           }
//         ]
//       };

//     return (
//         <div className="">
//              <Line className="graph" data={data}/>
//         </div>
//     )
// }

// export default Graph
