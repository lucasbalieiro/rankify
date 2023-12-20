import { Db, Collection, ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

import { connectToDatabase } from "@/services/database";
let db: Db;

export async function POST(request: NextRequest) {
    db = await connectToDatabase(db);
    const collection: Collection = db.collection('people_score')
    const payload = await request.json()



    await collection.insertOne({
        nominee_id: new ObjectId(payload.nominee_id),
        score: payload.score
    })


    return NextResponse.json({ status: 200 });
}
