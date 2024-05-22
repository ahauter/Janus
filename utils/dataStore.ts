import { SQLiteDatabase } from "expo-sqlite";
import { Task } from "../dataTypes";

const TASKTABLENAME = "tasks";

interface TaskEntry {
  id: number | undefined,
  name: string,
  category: string,
  dueDate: number,
  estimatedDuration: number,
  completed: boolean,
  isActive: boolean,
  isEvent: boolean
}

function EntryToTask(t: TaskEntry): Task {
  const { id, name, category, dueDate: date, completed, isEvent, estimatedDuration: estDur } = t;
  const dueDate = new Date();
  dueDate.setTime(date);
  const estimatedDuration = new Date();
  estimatedDuration.setTime(estDur);
  return { id, name, category, dueDate, completed, isEvent, estimatedDuration };
}

export async function addTask(db: SQLiteDatabase, t: Task): Promise<boolean> {
  if (t.id !== undefined) {
    console.error("Warning! Task already exists! Do not insert a task that has an id defined")
    return false;
  }
  const { id, name, category, dueDate: date, completed, isEvent, estimatedDuration: estDur } = t;
  try {
    //don't format the task values, because we don't want user's to sql inject themselves
    await db.runAsync(`
        INSERT INTO ${TASKTABLENAME} 
        (name, category, completed, dueDate, isEvent, isActive, isPaused, estimatedDuration) 
        VALUES (?, ?, ?, ?, ?, ?,?, ?);`,
      name, category, completed, date.getTime(), isEvent, 0, 0, estDur.getTime()
    );
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
}

export async function updateTask(db: SQLiteDatabase, t: Task): Promise<boolean> {
  if (t.id === undefined) {
    console.error("Warning! Task does not exist! Do not update a task without an id")
    return false;
  }
  const { id, name, category, dueDate: date, completed, isEvent, estimatedDuration: estDur } = t;
  try {
    //don't format the task values, because we don't want user's to sql inject themselves
    await db.runAsync(`
            UPDATE ${TASKTABLENAME} 
            SET 
                name = ?,
                category = ?,
                completed = ?,
                dueDate = ?,
                estimatedDuration = ?,
                isEvent = ?
            WHERE id = ?;`,
      name, category, completed, date.getTime(), estDur.getTime(), isEvent, id
    );
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
}

export async function removeActiveTask(db: SQLiteDatabase) {
  const task = await getActiveTask(db);
  if (task === null) return;
  const { id } = task;
  if (id === undefined) {
    console.error("Setting inactive task does not have an ID")
    return
  }
  try {
    await removeActiveTask(db);
    await db.runAsync(`
      UPDATE ${TASKTABLENAME} 
      SET 
        isActive = 0           
      WHERE id = ?;`,
      id
    );
  } catch (err) {
    console.error(err);
  }
}

export async function setActiveTask(db: SQLiteDatabase, t: Task) {
  if (t.id === undefined) {
    console.error("Warning! Task does not exist! Do not update a task without an id")
    return false;
  }
  const { id } = t;
  try {
    await removeActiveTask(db);
    await db.runAsync(`
      UPDATE ${TASKTABLENAME} 
      SET 
        isActive = 1           
      WHERE id = ?;`,
      id
    );
  } catch (err) {
    console.error(err);
  }
}

export async function getActiveTask(db: SQLiteDatabase) {
  try {
    //don't format the task values, because we don't want user's to sql inject themselves
    const tasks = await db.getFirstAsync<TaskEntry>(`
      SELECT * FROM ${TASKTABLENAME} 
      where isActive = 1;`,
    );
    return tasks ? EntryToTask(tasks) : null
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function isPaused(db: SQLiteDatabase): Promise<boolean> {
  try {
    //don't format the task values, because we don't want user's to sql inject themselves
    const isPaused = await db.getFirstAsync<boolean>(`
      SELECT isPaused FROM ${TASKTABLENAME} 
      where isActive = 1;`,
    );
    if (isPaused === null) return false;
    return isPaused
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function deleteTask(db: SQLiteDatabase, t: Task): Promise<boolean> {
  if (t.id === undefined) {
    console.error("Warning! Task does not exist! Do not delete a task without an id")
    return false;
  }
  const { id } = t;
  try {
    //don't format the task values, because we don't want user's to sql inject themselves
    await db.runAsync(`
            DELETE FROM ${TASKTABLENAME} 
            WHERE id = ?;`, id
    );
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
}

export async function getAllTasks(db: SQLiteDatabase, limit: number = 1000): Promise<Task[]> {
  try {
    //don't format the task values, because we don't want user's to sql inject themselves
    const tasks = await db.getAllAsync<TaskEntry>(`
      SELECT * FROM ${TASKTABLENAME} 
      LIMIT ?;`, limit
    );
    return tasks.map(EntryToTask)
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getAllIncompleteTasks(db: SQLiteDatabase, limit: number = 1000): Promise<Task[]> {
  try {
    //don't format the task values, because we don't want user's to sql inject themselves
    const tasks = await db.getAllAsync<TaskEntry>(`
            SELECT * FROM ${TASKTABLENAME} 
            WHERE completed = 0
            LIMIT ?;`, limit
    );
    return tasks.map(EntryToTask)
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function migrateDatabase(db: SQLiteDatabase) {
  //UPdate this if the schema changes :) 
  const databaseVersion = 1;
  try {
    await db.execAsync(`drop table ${TASKTABLENAME}`)
  } catch { }
  let dbVersionInfo = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version"
  );
  let currentDbVersion = 0;
  //if (dbVersionInfo) {
  //  currentDbVersion = dbVersionInfo.user_version;
  //}
  if (currentDbVersion >= databaseVersion) {
    return
  }
  if (currentDbVersion === 0) {
    //init tables for database
    await db.execAsync(`
        create table ${TASKTABLENAME} (
            id INTEGER PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            category TEXT,
            completed BOOLEAN NOT NULL CHECK (completed IN (0,1)),
            isEvent BOOLEAN NOT NULL CHECK (completed IN (0,1)),
            isActive BOOLEAN NOT NULL CHECK (completed IN (0,1)),
            isPaused BOOLEAN NOT NULL CHECK (completed IN (0,1)),
            dueDate INTEGER,
            estimatedDuration INTEGER
        );
        `)
    //example of how to insert data
  }
  /* add more migrations as we update schema 
  if (currentDbVersion === 1) {

  }
  */
  await db.execAsync(`PRAGMA user_version = ${databaseVersion}`)
}
