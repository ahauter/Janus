export interface Task {
    name: string,
    category: string,
    dueData: Date
}

export interface TimeBlock {
    //Number of miliseconds 
    duration: int
    startTime: Date
    tasks: Task[]
    category: string
    subTimeBlocks: TimeBlock[]
}