import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function GET() {
  try {
    Sentry.addBreadcrumb({
      category: 'test',
      message: 'Test error endpoint called',
      level: 'info'
    });

    // Track test endpoint usage
    Sentry.metrics.increment('test.api_called', 1, {
      tags: { endpoint: 'sentry-test-error' }
    });

    // Throw a test error
    throw new Error("This is a test server-side error from Sentry API route");
  } catch (error) {
    // Capture the error in Sentry
    Sentry.captureException(error, {
      tags: { component: 'test_api' }
    });

    // Track test error metric
    Sentry.metrics.increment('test.error_thrown', 1, {
      tags: { type: 'server_side' }
    });

    // Return error response
    return NextResponse.json(
      { error: "Server error tracked by Sentry" },
      { status: 500 }
    );
  }
}
