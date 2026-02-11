import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function GET() {
  try {
    // Throw a test error
    throw new Error("This is a test server-side error from Sentry API route");
  } catch (error) {
    // Capture the error in Sentry
    Sentry.captureException(error);

    // Return error response
    return NextResponse.json(
      { error: "Server error tracked by Sentry" },
      { status: 500 }
    );
  }
}
