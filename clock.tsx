import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Svg, Circle, Polygon, Rect } from 'react-native-svg';
import { TimeBlock } from "./dataTypes";


interface ClockProps {
    timeBlocks: TimeBlock[]
    //duration to display in miliseconds
    duration: number
}

export function Clock({ timeBlocks, duration }: ClockProps) {
  const colors = ["red", "blue", "yellow", "purple", "orange"]
  const size = 120
  const radius = size / 2
  const rotation = 360 / colors.length
  const vertexOffset = Math.round(radius * Math.tan(Math.PI / colors.length))
  const timeRegions = colors.map((color: string, index: number) => {
    const curRotation = rotation * index
    return <Polygon
      points={`${radius + vertexOffset} 0, ${radius - vertexOffset} 0, ${size /2} ${size /2}`}
      rotation={curRotation}
      originX={radius}
      originY={radius}
      fill={color}>
      
    </Polygon>       
  });
  return <View>
    <Svg width={size + 10} height={size + 10} >
      {timeRegions}
    </Svg>
  </View>
}
