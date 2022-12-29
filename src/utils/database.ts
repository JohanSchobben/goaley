import {DBSchema, IDBPDatabase, IDBPTransaction, openDB, StoreNames} from "idb";
import {DailyTaskDto} from "../models/dto/daily-task-dto";
import {DailyTaskExecutionDto} from "../models/dto/daily-task-execution-dto";

export interface DBTypes extends DBSchema {
    daily: {
        key: number;
        value: DailyTaskDto;
    },
    dailyExecution: {
        key: number;
        value: DailyTaskExecutionDto
    }
}

const db = await openDB("goaley", 1, {
    upgrade(database: IDBPDatabase<DBTypes>, oldVersion: number, newVersion: number | null, transaction: IDBPTransaction<DBTypes, StoreNames<DBTypes>[], "versionchange">, event: IDBVersionChangeEvent) {
        if (database.objectStoreNames.contains("daily")) {
            database.createObjectStore("daily", {autoIncrement: true})
        }
        if (database.objectStoreNames.contains("dailyExecution")) {
            database.createObjectStore("dailyExecution", {autoIncrement: true})
        }
    }
});


export const addEntity = (storeName: StoreNames<DBTypes>, value: any) => db.add(storeName, value)
export const updateEntity = (storeName: StoreNames<DBTypes>, key: number, value: any) => db.put(storeName, value, key)
export const deleteEntity = (storeName: StoreNames<DBTypes>, key: number) => db.delete(storeName, key)
export const getAllEntity = (storeName: StoreNames<DBTypes>) => db.getAll(storeName);
