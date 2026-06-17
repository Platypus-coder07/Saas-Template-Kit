import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import {GoogleGenAI} from "@google/genai";

// initailize client
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY || ""});

export async function POST(req: NextRequest) {
    const { userId } = await auth();
    if(!userId) {
        return NextResponse.json({error: "Unauthorized user"}, {status: 401});
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { isSubscribed: true },
        });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        if (!user.isSubscribed) {
            return NextResponse.json(
            {
                error: "The AI Task Decomposer is a premium feature. Please upgrade your subscription.",
            },
            { status: 403 },
            );
        }

        // parse payload
        const { taskTitle, taskDescription } = await req.json();
        if (!taskTitle?.trim()) {
            return NextResponse.json(
                { error: "Task title is required to decompose." },
                { status: 400 },
            );
        }

        // Prompt Configuration for Gemini
        const prompt = `Decompose this large, vague task into 3 to 5 clear, granular, actionable sub-tasks. Each sub-task must be concrete enough to be completed in a single 30-minute deep-work session. Avoid vague milestones.
    
        Task to break down:
        Title: ${taskTitle}
        Context/Description: ${taskDescription || "None provided"}`;

        // execute AI Call with Strict JSON Schema Enforcement
        const aiResponse = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                subTasks: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      title: { type: "STRING" },
                      description: { type: "STRING" },
                    },
                    required: ["title", "description"],
                  },
                },
              },
              required: ["subTasks"],
            },
          },
        });

        const responseText = aiResponse.text;

        if (!responseText) {
            throw new Error("Empty response received from AI engine");
        }

        const structuredData = JSON.parse(responseText);
        return NextResponse.json({ subTasks: structuredData.subTasks });  

    } catch (error) {
        console.error("AI Decomposer Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error during task decomposition" },
            { status: 500 },
        );
    }
}