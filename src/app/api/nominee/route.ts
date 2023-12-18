import { Db, Collection } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

import { connectToDatabase } from "@/app/services/database";
import Nominee from "@/app/interfaces/nominee";
let db: Db;

export async function GET(request: NextRequest) {
    db = await connectToDatabase(db);
    const collection: Collection<Nominee> = db.collection('nominees');

    const nominees = await collection.find({}).sort({ score: -1 }).toArray();

    return NextResponse.json(nominees, { status: 200 });
}
