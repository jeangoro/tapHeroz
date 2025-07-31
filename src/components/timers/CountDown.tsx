import React, { useEffect, useState } from "react";

const CountDown = ({ timeToWaitInSeconds }) => {
  //   let remainingTime = 60 * 60 * 60 * 24 * 5;
  let remainingTime = timeToWaitInSeconds;
  const [leftTime, setLeftTime] = useState("");

  function ionViewDidEnter() {
    //Call start timer function with time in seconds
    // remainingTime = 60 * 60 * 60 * 24 * 5;
    startTimer();
  }

  function startTimer() {
    const counter = setTimeout(() => {
      const time = getTimerClock(remainingTime);
      console.log(time);
      setLeftTime(time);
      if (remainingTime > 0) {
        startTimer();
        remainingTime--;
      } else {
        clearInterval(counter);
      }
    }, 1000);
  }

  function getTimerClock(inputSeconds: number) {
    const sec_num = parseInt(inputSeconds.toString(), 10);
    remainingTime = sec_num; //Define variable
    const days = Math.floor(sec_num / (60 * 60 * 24));
    const hours = Math.floor((sec_num - days * (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((sec_num - days * (60 * 60 * 24) - hours * (60 * 60)) / 60);
    const seconds = sec_num - days * 86400 - hours * 3600 - minutes * 60;
    let daysString = "";
    let hoursString = "";
    let minutesString = "";
    let secondsString = "";
    daysString = days < 10 ? "0" + days : days.toString();
    hoursString = hours < 10 ? "0" + hours : hours.toString();
    minutesString = minutes < 10 ? "0" + minutes : minutes.toString();
    secondsString = seconds < 10 ? "0" + seconds : seconds.toString();
    return daysString + "J " + hoursString + ":" + minutesString + ":" + secondsString;
  }

  useEffect(() => {
    ionViewDidEnter();
  }, []);

  return <> {leftTime}</>;
};

export default CountDown;
