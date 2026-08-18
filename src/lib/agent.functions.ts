import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(20),
  /** Plain-text snapshot of the page the user is looking at. */
  pageContext: z.string().max(12000).default(""),
});

export type AgentMessage = z.infer<typeof schema>["messages"][number];

export const askAgent = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      return { ok: false as const, error: "The AI service is not configured yet." };
    }

    const systemPrompt = [
      "You are the autonomous web agent embedded in this website.",
      "Answer questions about the page content the user is viewing.",
      "Use ONLY the page content below as your source of truth about this site.",
      "If the answer is not in the page content, say so plainly and offer what is there.",
      "Be concise: 1-4 sentences unless asked for detail.",
      "",
      "--- PAGE CONTENT ---",
      data.pageContext || "(no page content was captured)",
      "--- END PAGE CONTENT ---",
    ].join("\n");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: systemPrompt }, ...data.messages],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      if (res.status === 429) {
        return { ok: false as const, error: "Too many requests right now — try again shortly." };
      }
      if (res.status === 402 || res.status === 403) {
        return {
          ok: false as const,
          error: "AI usage is currently unavailable for this workspace.",
        };
      }
      console.error("AI gateway error", res.status, body);
      return { ok: false as const, error: "The agent couldn't answer that. Please try again." };
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = json.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return { ok: false as const, error: "The agent returned an empty answer." };
    }
    return { ok: true as const, reply };
  });
