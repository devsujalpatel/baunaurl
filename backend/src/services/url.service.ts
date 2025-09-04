import { eq } from "drizzle-orm";
import { db } from "../db/index.ts";
import { urlsTable } from "../models/url.model.ts";

export async function getUrlByShortCode(shortCode: string) {
  try {
    const [url] = await db
      .select({
        id: urlsTable.id,
        shortCode: urlsTable.shortCode,
        targetUrl: urlsTable.targetUrl,
      })
      .from(urlsTable)
      .where(eq(urlsTable.shortCode, shortCode));

    return url;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createShorten(
  shortCode: string,
  url: string,
  userId: string
) {
  const [result] = await db
    .insert(urlsTable)
    .values({
      shortCode,
      targetUrl: url,
      userId,
    })
    .returning({
      id: urlsTable.id,
      shortCode: urlsTable.shortCode,
      targetUrl: urlsTable.targetUrl,
    });

  return result;
}
