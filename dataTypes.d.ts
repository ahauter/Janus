export interface Task {
  id: number | undefined,
  name: string,
  category: string,
  dueDate: Date,
  completed: boolean
  estimatedDuration: Date
}

export interface TimeBlock {
  //Number of miliseconds 
  duration: int
  startTime: Date
  tasks: Task[]
  category: string
  subTimeBlocks: TimeBlock[]
}
