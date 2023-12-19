import Judge from "@/interfaces/judge";
import { connectToDatabase } from "@/services/database";
import { Collection, Db } from "mongodb";
import { NextRequest ,NextResponse } from "next/server";

let db: Db;

export async function GET(request: NextRequest, { params }: { params: { accessToken: string } }) {
    db = await connectToDatabase(db)

    const collection: Collection<Judge> = db.collection("judges")
    const judge = await collection.findOne({ token: params.accessToken })
    if (!judge)
        return NextResponse.json({"error": "Invalid Auth"}, {status: 403})

    return NextResponse.json({status: 204})

}
