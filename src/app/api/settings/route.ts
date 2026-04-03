import { connectDb } from "@/lib/db";
import Settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDb();

    const body = await req.json();
    const { ownerID, businessName, supportEmail, knowledge } = body;

    const data = await Settings.findOneAndUpdate(
      { ownerID },
      { businessName, supportEmail, knowledge },
      { upsert: true, new: true }
    );

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "setting error " + error },
      { status: 500 }
    );
  }
}
