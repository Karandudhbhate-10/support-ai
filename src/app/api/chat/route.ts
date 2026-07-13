import { connectDb } from "@/lib/db";
import Settings from "@/model/settings.model";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const { message, ownerID } = await req.json();

    if (!message || !ownerID) {
      return NextResponse.json(
        { message: "message and ownerId is required" },
        { status: 400 }
      );
    }

    const setting = await Settings.findOne({ ownerID });

    if (!setting) {
      return NextResponse.json(
        { message: "chatbot is not configured yet" },
        { status: 400 }
      );
    }
    const prompt = `You are a smart AI customer support assistant for ${setting.businessName}.

    Business Details:
    - Support Email: ${setting.supportEmail}
    
    Knowledge Base:
    ${setting.knowledge}
    
    Rules:
    - Be friendly, natural, and human-like.
    - If user greets (hi, hello, hey), respond warmly.
    - If user asks general questions, respond normally.
    - If question is related to business, use the knowledge base.
    - If answer is NOT in knowledge base, THEN say:
      "Please contact our support team at ${setting.supportEmail}"
    - Keep answers short (1–3 sentences).
    - Do NOT sound robotic.
    
    User Message:
    ${message}
    `;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // ✅ FIX: Properly extract text
    const reply =
      response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No response from AI";

    const res = NextResponse.json({ reply });

    // ✅ CORS FIX
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return res;
  } catch (error) {
    console.error("CHAT ERROR:", error);

    const res = NextResponse.json(
      { reply: "⚠️ Server error, try again later" },
      { status: 500 }
    );

    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return res;
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
