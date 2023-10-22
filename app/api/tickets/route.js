import Ticket from "../../(models)/Ticket";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const ticketData = body.formData;
    await Ticket.create(ticketData);

    return NextResponse.json({ message: "Ticket Created:" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error:", err }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const tickets = await Ticket.find();
    return NextResponse.json({ tickets }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error:", err }, { status: 500 });
  }
}
