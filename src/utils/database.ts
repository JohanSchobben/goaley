import {DBSchema, IDBPDatabase, IDBPTransaction, openDB, StoreNames} from "idb";

export interface DBTypes extends DBSchema {

}

const db = await openDB("goaley", 1, {
    upgrade(database: IDBPDatabase<DBTypes>, oldVersion: number, newVersion: number | null, transaction: IDBPTransaction<DBTypes, StoreNames<DBTypes>[], "versionchange">, event: IDBVersionChangeEvent) {
    }
});


const addEntity = (storeName: StoreNames<DBTypes>, value: any) => db.add(storeName, value)
const updateEntity = (storeName: StoreNames<DBTypes>, key: number, value: any) => db.put(storeName, value, key)
const deleteEntity = (storeName: StoreNames<DBTypes>, key: number) => db.delete(storeName, key)
const getAllEntity = (storeName: StoreNames<DBTypes>) => db.getAll(storeName);
