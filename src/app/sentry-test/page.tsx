"use client";

import * as Sentry from "@sentry/nextjs";
import { sentryMetrics } from "@/lib/sentry-utils";

export default function SentryTestPage() {
  const throwClientError = () => {
    Sentry.addBreadcrumb({
      category: 'test',
      message: 'User clicked: Throw Client Error',
      level: 'info'
    });
    sentryMetrics.increment('test.button_clicked', 1, {
      tags: { button: 'client_error' }
    });
    throw new Error("This is a test client-side error from Sentry test page");
  };

  const throwServerError = async () => {
    Sentry.addBreadcrumb({
      category: 'test',
      message: 'User clicked: Throw Server Error',
      level: 'info'
    });
    sentryMetrics.increment('test.button_clicked', 1, {
      tags: { button: 'server_error' }
    });
    const response = await fetch("/api/sentry-test-error");
    const data = await response.json();
    console.log(data);
  };

  const captureMessage = () => {
    Sentry.addBreadcrumb({
      category: 'test',
      message: 'User clicked: Send Test Message',
      level: 'info'
    });
    sentryMetrics.increment('test.button_clicked', 1, {
      tags: { button: 'message' }
    });
    Sentry.captureMessage("Test message from Sentry test page", "info");
    alert("Message sent to Sentry! Check your Sentry dashboard.");
  };

  const captureException = () => {
    Sentry.addBreadcrumb({
      category: 'test',
      message: 'User clicked: Capture Test Exception',
      level: 'info'
    });
    sentryMetrics.increment('test.button_clicked', 1, {
      tags: { button: 'exception' }
    });
    try {
      throw new Error("Test exception captured manually");
    } catch (error) {
      Sentry.captureException(error);
      alert("Exception sent to Sentry! Check your Sentry dashboard.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Sentry Test Page
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Click the buttons below to test different Sentry error tracking features.
        </p>

        <div className="space-y-4">
          <button
            onClick={throwClientError}
            className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            Throw Client-Side Error
          </button>

          <button
            onClick={throwServerError}
            className="w-full px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
          >
            Trigger Server-Side Error
          </button>

          <button
            onClick={captureMessage}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Send Test Message
          </button>

          <button
            onClick={captureException}
            className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
          >
            Capture Test Exception
          </button>
        </div>

        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            Instructions:
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>Click any button to test Sentry error tracking</li>
            <li>Check your Sentry dashboard at sentry.io</li>
            <li>Errors should appear within a few seconds</li>
            <li>Source maps are enabled for better stack traces</li>
          </ul>
        </div>

        <a
          href="/"
          className="mt-6 inline-block text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
