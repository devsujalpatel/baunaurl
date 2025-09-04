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

export const getAllUrls = async (id: string) => {
  try {
    const codes = await db
      .select()
      .from(urlsTable)
      .where(eq(urlsTable.userId, id));

    return codes;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUrlById = async (id: string) => {
  try {
    const [url] = await db.select().from(urlsTable).where(eq(urlsTable.id, id));

    return url;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUrlById = async (id: string) => {
  try {
    await db.delete(urlsTable).where(eq(urlsTable.id, id));

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
