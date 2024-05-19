import React from 'react'
import {  View, StyleSheet } from 'react-native'
import { Svg, Circle, Text, Polygon, ClipPath, Defs, G, Line } from 'react-native-svg';
import { TimeBlock } from "./dataTypes";
import { useClockInfo } from './utils';


interface ClockProps {
    timeBlocks: TimeBlock[]
    //duration to display in miliseconds
    duration: number
}

function blockColor(block: TimeBlock) {
  switch (block.category) {
    case "sleep":
      return "blue"
    case "work":
      return "orange"
    default:
      return "gray"
  }  
}

export function Clock({ timeBlocks, duration }: ClockProps) {
  const {timeStr, handAngle} = useClockInfo();
  const size = 420
  const radius = size / 2
  const rotation = 360 / timeBlocks.length
  const vertexOffset = Math.round(radius * Math.tan(Math.PI / timeBlocks.length))
  const timeRegions = timeBlocks.map((block: TimeBlock, index: number) => {
    const curRotation = rotation * index
    return <Polygon
      key={`timeBlock-${index}`}
      points={`${radius + vertexOffset} 0, ${radius - vertexOffset} 0, ${size /2} ${size /2}`}
      rotation={curRotation}
      originX={radius}
      originY={radius}
      fill={blockColor(block)}>
      <Text
        fill="black" 
        stroke="black"
        textAnchor="middle"
        fontSize={5}
        x={0}
        y={radius/4}
      >{index}</Text>
    </Polygon>       
  });
  
  const regionDividers = [];
  for (let i = 0; i < timeBlocks.length; i ++) {
    const curRotation = rotation * i + rotation / 2
    regionDividers.push(<Line 
      key={`divider-${i}`}
      x1={size/2}                   
      y1={size/2}                   
      x2={size/2}                   
      y2={0}                   
      originX={radius}
      originY={radius}
      stroke={"black"}
      strokeWidth={1}
      rotation={curRotation}
    />)
  }
  return <View>
    <Svg width={size + 10} height={size + 10}>
    <Defs>    
      <ClipPath id="outerClip">
        <Circle
          cx={size/2}
          cy={size/2}
          r={0.95 * radius}
        />
      </ClipPath>
    </Defs>    
    <G clipPath='url(#outerClip)'>
      {timeRegions}
    </G>
    <Circle
      fill="white"
      cx={size/2}
      cy={size/2}
      r={0.65 * radius}
    />
    <G clipPath='url(#outerClip)'>
      {regionDividers} 
      <Line 
        x1={size/2}                   
        y1={size/2}                   
        x2={size/2}                   
        y2={0}                   
        originX={radius}
        originY={radius}
        stroke={"purple"}
        strokeWidth={5}
        rotation={Math.round(handAngle)}
      />
    </G>
    <Circle
      fill="white"
      stroke="black"
      strokeWidth={2}
      cx={size/2}
      cy={size/2}
      r={0.25 * radius}
    />
    <Text
      fill="black"
      stroke="black"
      fontSize="20"
      x={radius}
      y={radius + 10}
      textAnchor="middle" >
     {timeStr}
    </Text>
  </Svg>
  </View>
}
