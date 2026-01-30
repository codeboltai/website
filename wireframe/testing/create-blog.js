#!/usr/bin/env node
import { createOpencode } from "@opencode-ai/sdk";
import net from "net";

function findAvailablePort(startPort = 4096) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    server.on("error", () => {
      server.close(() => findAvailablePort(startPort + 1).then(resolve));
    });
  });
}

const port = await findAvailablePort(5043);
console.log(`Using available port: ${port}`);

const { client, server } = await createOpencode({
  hostname: "127.0.0.1",
  port,
});

console.log(`OpenCode server running at ${server.url}`);

async function createBlog(topic) {
  let session = null;
  try {
    console.log(`Creating blog post about: ${topic}`);

    const sessionResult = await client.session.create({
      body: { title: `Blog: ${topic}` },
    });
    session = sessionResult.data || sessionResult;
    console.log("Session ID:", session?.id);

    if (!session?.id) {
      throw new Error("Failed to create session - no ID returned");
    }

    const config = await client.config.get()
    const providersResult = await client.config.providers()
    const providers = providersResult.data?.providers || []
    const defaults = providersResult.data?.default || {}

    console.log("\n=== Available Providers ===");
    providers.forEach(p => {
      console.log(`Provider: ${p.id}`);
      console.log(`  Models: ${Array.isArray(p.models) ? p.models.join(", ") : JSON.stringify(p.models) || "none"}`);
    });
    console.log("\n=== Defaults ===");
    console.log(JSON.stringify(defaults, null, 2));
    console.log("===========================\n");

    console.log("Sending prompt...");

    // Check if openai is available
    // const openaiProvider = providers.find(p => p.id === "openai");
    // const model = openaiProvider ? {
    //   providerID: "openai",
    //   modelID: openaiProvider.models[0] || "gpt-4o-mini"
    // } : {
    //   providerID: providers[0]?.id || "opencode",
    //   modelID: providers[0]?.models[0] || "default"
    // };
    const model = {
      providerID: "zai-coding-plan",
      modelID: "glm-4.7"
    }

    console.log("Using model:", JSON.stringify(model, null, 2));

    const promptResult = await client.session.prompt({
      path: { id: session.id },
      body: {
        model,
        parts: [
          {
            type: "text",
            text: `Hello, write a short blog post about ${topic}. Keep it under 200 words.`,
          },
        ],
      },
    });

    console.log("Prompt result:", JSON.stringify(promptResult, null, 2));

    console.log("Fetching messages...");
    const messagesResult = await client.session.messages({
      path: { id: session.id }
    });
    console.log("Messages result:", JSON.stringify(messagesResult, null, 2));

    if (messagesResult.parts && messagesResult.parts.length > 0) {
      const lastPart = messagesResult.parts[messagesResult.parts.length - 1];
      console.log("Last part:", JSON.stringify(lastPart, null, 2));
    }

    console.log("\n" + "=".repeat(60));
    console.log("FULL RESULT:");
    console.log("=".repeat(60));
    console.log(JSON.stringify(promptResult, null, 2));
    console.log("=".repeat(60));

    const blogContent = promptResult.parts?.find(p => p.type === "text")?.text || promptResult.info?.parts?.find(p => p.type === "text")?.text || promptResult.data?.content || promptResult.content || "No content found";
    console.log("\nBLOG POST:");
    console.log("=".repeat(60));
    console.log(blogContent);
    console.log("=".repeat(60) + "\n");

    if (session) {
      await client.session.delete({ path: { id: session.id } });
    }
  } catch (error) {
    console.error("Error creating blog:", error.message);
    console.error("Full error:", error);
  } finally {
    server.close();
    console.log("Server closed");
  }
}

const topic = process.argv[2];
if (!topic) {
  console.error("Usage: node create-blog.js <topic>");
  process.exit(1);
}

createBlog(topic);
