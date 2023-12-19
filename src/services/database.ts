import { Db, MongoClient } from "mongodb"
import {URL} from 'url'


export async function connectToDatabase(cachedDb: Db) {
    const uri = process.env.MONGODB_URI

    if (!uri) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env')
    }

    if (cachedDb) {
        return cachedDb
    }

    const client = await MongoClient.connect(uri)

    const dbName = new URL(uri).pathname?.substring(1)

    const db = client.db(dbName)

    cachedDb = db

    return db
}