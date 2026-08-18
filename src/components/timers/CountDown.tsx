import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

const CountDown = ({ timeToWaitInSeconds }) => {
  //   let remainingTime = 60 * 60 * 60 * 24 * 5;
  // let remainingTime = timeToWaitInSeconds;
  const remainingTime = useRef(timeToWaitInSeconds);
  const [leftTime, setLeftTime] = useState("");
  const [competitionStarted, setCompetitionStarted] = useState(remainingTime.current > 0 ? false : true);

  const history = useHistory();
  // const [pageIsRefreshed, setPageIsRefreshed] = useState(false);

  const refreshPage = useCallback(() => {
    history.go(0);
  }, [history]);

  useEffect(() => {
    setCompetitionStarted(remainingTime.current > 0 ? false : true);
  }, []);

  const getTimerClock = useCallback((inputSeconds: number) => {
    const sec_num = parseInt(inputSeconds.toString(), 10);
    remainingTime.current = sec_num; //Define variable
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
  }, []);

  const startTimer = useCallback(() => {
    const counter = setTimeout(() => {
      const time = getTimerClock(remainingTime.current);
      console.log(time);
      setLeftTime(time);
      if (remainingTime.current > 0) {
        startTimer();
        remainingTime.current--;
      } else {
        clearInterval(counter);
        if (!competitionStarted) {
          refreshPage();
        }
        // refreshPage();
        // if (!pageIsRefreshed) {
        //   clearInterval(counter);
        //   history.go(0);
        //   history.push("play");
        //   setPageIsRefreshed(true);
        // }
      }
    }, 1000);
  }, [getTimerClock, refreshPage, remainingTime, competitionStarted]);

  const ionViewDidEnter = useCallback(() => {
    //Call start timer function with time in seconds
    // remainingTime = 60 * 60 * 60 * 24 * 5;
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    ionViewDidEnter();
  }, [ionViewDidEnter]);

  return <> {leftTime}</>;
};

export default CountDown;
