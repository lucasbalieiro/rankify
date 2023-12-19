import { Db, Collection } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

import { connectToDatabase } from "@/services/database";
import Nominee from "@/interfaces/nominee";
let db: Db;

export async function POST(request: NextRequest) {
    const payload = await request.json()
    db = await connectToDatabase(db);

    const collection: Collection<Nominee> = db.collection('judges');
    const judge = await collection.findOne({accessCode: payload.accessCode})
    if (!judge)
        return NextResponse.json({"error": "Invalid Access Code"}, {status: 400})
    return NextResponse.json(judge, { status: 200 });
}
