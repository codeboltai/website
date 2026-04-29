#!/usr/bin/env node
import { createOpencodeClient } from "@opencode-ai/sdk";

const client = createOpencodeClient({
  baseUrl: "http://localhost:5067",
});

async function createBlog(topic) {
  try {
    console.log(`Creating blog post about: ${topic}`);

    const promptText = `Hello, write a short blog post about ${topic}. Keep it under 200 words.`;

    console.log("Appending prompt to TUI...");

    await client.tui.appendPrompt({
      body: { text: promptText },
    });

    console.log("Submitting prompt...");
    await client.tui.submitPrompt();

    const events = await client.event.subscribe()
    for await (const event of events.stream) {
      console.log("Event:", event.type, event.properties)

      if (event.type === "session.idle" && event.properties?.sessionID) {
        console.log("Session idle detected, resubmitting prompt...")
        await client.tui.appendPrompt({
          body: { text: promptText },
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
        await client.tui.submitPrompt();
      }
    }

    console.log("Prompt submitted successfully!");
  } catch (error) {
    console.error("Error creating blog:", error.message);
    console.error("Full error:", error);
  }
}

const topic = process.argv[2];
if (!topic) {
  console.error("Usage: node create-blog.js <topic>");
  process.exit(1);
}

createBlog(topic);
