import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { CONTENT_TAGS } from "@/sanity/fetch";

/**
 * Target of a Sanity GROQ-powered webhook (Create / Update / Delete, projection `{_type}`).
 * Expires every page that depends on the changed document type.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return new Response("Revalidation secret is not configured", { status: 500 });

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret, true);
    if (!isValidSignature) return new Response("Invalid signature", { status: 401 });

    const type = body?._type;
    if (!type || !(CONTENT_TAGS as readonly string[]).includes(type)) {
      return Response.json({ revalidated: false, reason: "Ignored document type", type }, { status: 200 });
    }

    // Categories/services are dereferenced inside project queries, so all content shares the tags.
    revalidateTag(type, { expire: 0 });
    return Response.json({ revalidated: true, type });
  } catch (error) {
    console.error("[revalidate]", error);
    return new Response("Bad request", { status: 400 });
  }
}
