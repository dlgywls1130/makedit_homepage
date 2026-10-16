import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/client";

/**
 * Called by the Sanity Presentation tool. next-sanity verifies a short-lived secret
 * created by the Studio before enabling Next.js draft mode, so this URL cannot be abused.
 */
const token = process.env.SANITY_API_READ_TOKEN;

export const GET =
  client && token
    ? defineEnableDraftMode({ client: client.withConfig({ token }) }).GET
    : () => new Response("Preview is not configured", { status: 503 });
