import { TimeBlock } from "../dataTypes";
import { Category } from "./categories";
import { useState } from 'react'

function getTimeBlockCategory(hour: number, dosha: "vata" | "pitta" | "kapha" = "vata"): Category {
  if (dosha === "vata") {
    if (hour >= 21 || hour <= 4) return "Sleep"
    if (hour > 21 || hour < 4) return "Spiritual"
    if (hour > 5 && hour <= 10 || hour >= 16 && hour <= 20) return "Work/Creativity"
    if (hour > 10 && hour <= 11) return "Exercise"
    if (hour > 11 && hour <= 12 || hour > 14 && hour < 16) return "Chores"
    if (hour > 12 && hour <= 13) return "Social"
  } else if (dosha === "pitta") { } else { }
  return "None"
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
