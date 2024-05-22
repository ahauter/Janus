export interface Task {
  id: number | undefined,
  name: string,
  category: string,
  dueDate: Date,
  //for now user can figure out preqs
  //preqTasks: Task[],
  completed: boolean,
  isEvent: boolean,
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
