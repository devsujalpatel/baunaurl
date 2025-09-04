import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { shortenPostRequestBodySchema } from "../validation/request.validation.ts";
import {
  createShorten,
  getUrlByShortCode,
  getAllUrls,
  getUrlById,
  deleteUrlById,
} from "../services/url.service.ts";


export const shortenUrl = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
      req.body
    );

    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.format() });
    }

    const { url, code } = validationResult.data;
    const shortCode = code ?? nanoid(6);

    const existingShortCode = await getUrlByShortCode(shortCode);
    if (existingShortCode) {
      return res.status(400).json({ error: "This code already exits" });
    }

    const result = await createShorten(shortCode, url, userId);

    return res.status(201).json({
      id: result.id,
      shortCode: result.shortCode,
      targetUrl: result.targetUrl,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUrls = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const urls = await getAllUrls(userId);

    return res.status(200).json({ data: urls });
  } catch (error) {}
};

export const redirectToUrl = async (req: Request, res: Response) => {
  const code = req.params.shortCode;

  const url = await getUrlByShortCode(code);

  if (!url) {
    return res.status(404).json({ error: "Url Not Found" });
  }

  return res.redirect(url.targetUrl);
};

export const deleteUrl = async (req: Request, res: Response) => {
  const id = req.params.id;

  const url = await getUrlById(id);

  if (!url) {
    return res.status(404).json({ error: "Url Not Found" });
  }

  await deleteUrlById(id);

  return res.status(200).json({ message: "Url deleted successfully" });
};
