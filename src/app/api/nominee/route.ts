import { Db, Collection, ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

import { connectToDatabase } from "@/app/services/database";
import Nominee from "@/app/interfaces/nominee";
import Judge from "@/app/interfaces/judge";
let db: Db;

export async function GET(request: NextRequest) {
    db = await connectToDatabase(db);
    const collection: Collection<Nominee> = db.collection('nominees');

    const nominees = await collection.find({}).sort({ score: -1 }).toArray();

    return NextResponse.json(nominees, { status: 200 });
}

export async function PUT(request: NextRequest) {
    try {
        const payload = await request.json();
        db = await connectToDatabase(db);
        const judgeColletion: Collection<Judge> = db.collection('judges');
        const collection: Collection<Nominee> = db.collection('nominees');

        const judge = await judgeColletion.findOne({ token: payload.token });
        if (!judge) {
            return NextResponse.json({ error: "Invalid Judge Token" }, { status: 403 });
        }
        const nomineeId = new ObjectId(payload.nominee_id);
        //@ts-ignore
        const nominee = await collection.findOne({ _id: nomineeId });

        if (!nominee) {
            return NextResponse.json({ error: "Unable to find nominee" }, { status: 400 });
        }

        // Check if the judge's score already exists
        const existingScore = nominee.score.find((score) => score.judge_id.toString() === judge._id.toString());

        if (existingScore) {
            // Update the existing score for the judge
            const updatedScores = nominee.score.map((score) => {
                if (score.judge_id.toString() === judge._id.toString()) {
                    return { judge_id: judge._id, value: payload.score };
                }
                return score;
            });

            await collection.updateOne(
                { _id: nominee._id },
                { $set: { score: updatedScores } }
            );
        } else {
            // Add a new score for the judge
            await collection.updateOne(
                { _id: nominee._id },
                { $push: { score: { judge_id: judge._id, value: payload.score } } }
            );
        }

        return NextResponse.json({ status: 204 });
    } catch (error) {
        console.error("Error processing PUT request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
