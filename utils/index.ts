import { TimeBlock } from "../dataTypes";
import { useState } from 'react'
function getTimeBlockCategory(hour: number): string {
  if (hour < 7 || hour > 21) return "sleep";
  if (hour > 9 && hour < 17) return "work";
  return "idk man";
}

/**
  * Returns a list of hour-long timeblocks for the current date
  */
export function generateTimeBlocksForDay(): TimeBlock[] {
  //just doing hours for now 
  const result: TimeBlock[] = [];
  const hourLength = 1000 * 60 * 60;
  for (let i = 0; i < 24; i++) {
    const startDate = new Date();
    startDate.setHours(i, 0, 0, 0);
    const t: TimeBlock = {
      startTime: startDate,
      duration: hourLength,
      category: getTimeBlockCategory(i),
      tasks: [],
      subTimeBlocks: []
    }
    result.push(t);
  }
  return result;
}

export function useClockInfo() {
  const [timeStr, setTimeStr] = useState("");
  const [angle, setAngle] = useState(0);
  const dayLength = 1000 * 60 * 60 * 24;
  const getTimeStr = () => {
    const timeString = (new Date()).toLocaleTimeString();
    setTimeStr(timeString);
    const dayStart = new Date()
    dayStart.setHours(0, 0, 0, 0);
    const currentH = new Date();
    const diff = currentH.getTime() - dayStart.getTime();
    const ang = diff / dayLength * 360;
    setAngle(Math.round(ang));
  };
  setInterval(getTimeStr, 1000);
  return { timeStr, handAngle: angle };
}
