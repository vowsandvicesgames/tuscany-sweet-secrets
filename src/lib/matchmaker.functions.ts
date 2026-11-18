import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const HEROINES = `- sofia: Sofia, the headmistress. Strict and authoritative by day, deeply caring and protective in private. Older, mature, forbidden-authority romance, slow burn, complicated loyalty.
- mia: Mia, the quiet one. Shy, almost silent girl who only ever spoke to Luca. Tender, sweet, innocent-feeling, emotional, healing and trust.
- gloria: Gloria, the dancer. Artistic, confident, radiant smile and laugh, made Luca her dance partner. Fun, playful, warm, body-positive, joyful romance.
- bianca: Bianca, the fitness instructor. Fiery, competitive, Luca's old gym partner. Passionate, bold, physical, teasing rivalry.
- emily: Emily, the childhood best friend. Fearless, adventurous, loyal. Friends-to-lovers, nostalgia, banter, shared history.`;

const schema = z.object({
  slug: z.enum(["sofia", "mia", "gloria", "bianca", "emily"]),
  reason: z.string(),
});

export const recommendHeroine = createServerFn({ method: "POST" })
  .inputValidator((input: { text: string }) => {
    const text = String(input?.text ?? "").trim();
    if (text.length < 3 || text.length > 600) throw new Error("Please write between 3 and 600 characters.");
    return { text };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { error: "Matchmaker is not configured." as string };
    const { createOpenAI } = await import("@ai-sdk/openai");
    const { streamText, Output } = await import("ai");
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });
    try {
      const result = streamText({
        model: provider.responses("openai/gpt-6.1-sol"),
        maxRetries: 0,
        system: `You are the matchmaker for "Sweet Sin of Tuscany", a romantic 18+ visual novel. The player describes the love story they want. Pick the ONE heroine who fits best:\n${HEROINES}\nWrite "reason" as 2-3 warm, teasing sentences addressed to the player ("you"), in the same language the player wrote in. Keep it suggestive but not explicit.`,
        messages: [{ role: "user", content: data.text }],
        output: Output.object({ schema }),
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "low",
            reasoningSummary: "auto",
            store: false,
            include: ["reasoning.encrypted_content"],
          },
        },
      });
      const out = await result.output;
      return { slug: out.slug, reason: out.reason };
    } catch (e: any) {
      console.error("matchmaker error", e?.statusCode, e?.message);
      const status = e?.statusCode;
      if (status === 429) return { error: "Too many requests right now, please try again in a minute." };
      if (status === 402) return { error: "The matchmaker is resting right now. Please try again later." };
      return { error: "The matchmaker couldn't decide this time. Please try again." };
    }
  });
