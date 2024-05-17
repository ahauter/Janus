import React from 'react'
import { Text } from 'react-native'
import { TimeBlock } from "./dataTypes";
interface ClockProps {
    timeBlocks: TimeBlock[]
}
export function Clock({ timeBlocks }: ClockProps) {
    return <Text>Hello World</Text>
}