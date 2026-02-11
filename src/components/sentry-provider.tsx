"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export function SentryProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Sentry on the client side
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 1.0,
      debug: true,
      replaysOnErrorSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      integrations: [
        Sentry.replayIntegration({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
    });

    console.log("✅ Sentry initialized with DSN:", process.env.NEXT_PUBLIC_SENTRY_DSN);
  }, []);

  return <>{children}</>;
}
