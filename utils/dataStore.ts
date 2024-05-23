import { SQLiteDatabase } from "expo-sqlite";
import { Task } from "../dataTypes";

const TASKTABLENAME = "tasks";

interface TaskEntry {
    id: number | undefined,
    name: string,
    category: string,
    dueDate: number,
    completed: boolean
}

function EntryToTask(t: TaskEntry): Task {
    const { id, name, category, dueDate: date, completed } = t;
    const dueDate = new Date();
    dueDate.setTime(date);
    return { id, name, category, dueDate, completed };
}

export async function addTask(db: SQLiteDatabase, t: Task): Promise<boolean> {
    if (t.id !== undefined) {
        console.error("Warning! Task already exists! Do not insert a task that has an id defined")
        return false;
    }
    const { name, category, dueDate: date, completed } = t;
    try {
        //don't format the task values, because we don't want user's to sql inject themselves
        await db.runAsync(`
            INSERT INTO ${TASKTABLENAME} (name, category, completed, dueDate) VALUES (?, ?, ?, ?);`,
            name, category, completed, date.getTime()
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
    const { id, name, category, dueDate: date, completed } = t;
    try {
        //don't format the task values, because we don't want user's to sql inject themselves
        await db.runAsync(`
            UPDATE ${TASKTABLENAME} 
            SET 
                name = ?,
                category = ?,
                completed = ?,
                dueDate = ? 
            WHERE id = ?;`,
            name, category, completed, date.getTime(), id
        );
    } catch (err) {
        console.error(err);
        return false;
    }
    return true;
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
    let dbVersionInfo = await db.getFirstAsync<{ user_version: number }>(
        "PRAGMA user_version"
    );
    let currentDbVersion = 0;
    if (dbVersionInfo) {
        currentDbVersion = dbVersionInfo.user_version;
    }
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
            dueDate INTEGER
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