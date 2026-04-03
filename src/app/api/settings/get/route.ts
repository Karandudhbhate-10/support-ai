import { connectDb } from "@/lib/db";
import Settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ownerID } = await req.json();
    if (!ownerID) {
      return NextResponse.json(
        { message: "owner id is required " },
        { status: 400 }
      );
    }
    await connectDb;
    const settings = await Settings.findOne({ ownerID });
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { message: `seeting error${error}` },
      { status: 500 }
    );
  }
}
