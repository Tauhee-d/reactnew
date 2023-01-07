import React from 'react'
import Graph from './Graph';

export  default function DayData({}) {
    // const count = 100
    function getZeroTime() {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
      }
    
      function addDate(plus) {
        let today = getZeroTime();
        today.setDate(today.getDate() + plus);
        return today;
      }
    
      const Data = [];
    
      var ranTime = [];
    
      const min = getZeroTime().getTime();
      const max = addDate(1).getTime() - 1;
    
      for (let k = 0; k < 10; k++) {
        var time = Math.round(Math.random() * (max - min) + min);
        ranTime.push(time);
      }
      ranTime.sort();
    
      for (let i = 0; i < 10; i++) {
        var temp = Math.round(Math.random() * (450 - 220) + 220);
        temp = temp / 10;
    
        var d = new Date(ranTime[i]);
    
        console.log("day", d);
        // console.log("week", w);
        // console.log("month", m);
        var x = d.getHours() + ":" + d.getMinutes();
    
        Data.push({
          Time: x,
          Temperature: temp,
        });
      }
    return (
        <Graph readings={Data}/>
    )
}



