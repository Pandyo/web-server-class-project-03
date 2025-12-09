// src/app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from "mongodb";
import { ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

interface ProjectData {
    _id: ObjectId;
    slug: string;
    name: string;
    structure: Array<{
        id: string;
        title: string;
        messages: string[];
    }>;
}

export async function GET(request: NextRequest) {
    let client: MongoClient | null = null;
    
    const DB_NAME = "graph"; 
    const COLLECTION_NAME = "devops";

    try {
        client = new MongoClient(uri!);
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection<ProjectData>(COLLECTION_NAME);

        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        if (slug) {
            
            const project = await collection.findOne({ slug: slug });

            if (!project) {
                return NextResponse.json({ message: 'Project not found' }, { status: 404 });
            }

            return NextResponse.json(project);

        } else {
                const projects = await collection.find({})
                .project({ slug: 1, name: 1, _id: 0 }) 
                .toArray();

            return NextResponse.json(projects);
        }

    } catch (error) {
        console.error("MongoDB API Error:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    } finally {
        if (client) {
            await client.close();
        }
    }
}