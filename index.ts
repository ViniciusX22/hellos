import express, { Request, Response } from "express";
import { Canvas, createCanvas } from "canvas";
import dotenv from "dotenv";
import { HELLOS, Language } from "./hellos";
import { registerFonts } from "./fonts";

dotenv.config();

const CUSTOM_FONT_LANGUAGES: Language[] = ["Japanese", "Korean", "Chinese"];

const app = express();
const port = process.env.PORT || 3000;

registerFonts();

function getRandomLanguage() {
  const languages = Object.keys(HELLOS);
  return languages[
    Math.floor(Math.random() * Object.keys(HELLOS).length)
  ] as Language;
}

function getFontForLanguage(language: Language) {
  return CUSTOM_FONT_LANGUAGES.includes(language)
    ? `Noto Sans ${language}`
    : "Noto Sans";
}

function parseBorderRadius(borderRadius: string | number) {
  if (typeof borderRadius == "number") return borderRadius;

  if (borderRadius.includes(",")) {
    return borderRadius.split(",").map((r) => Number(r));
  }

  return Number(borderRadius) || 20;
}

type DrawOptions = {
  width?: number | string;
  height?: number | string;
  fontSize?: number | string;
  textColor?: string;
  bgColor?: string;
  borderRadius?: number | string;
};

function drawHello({
  width = 300,
  height = 200,
  fontSize = 40,
  textColor = "white",
  bgColor = "teal",
  borderRadius = 20,
}: DrawOptions): Canvas {
  width = Number(width) || 300;
  height = Number(height) || 200;
  fontSize = Number(fontSize) || 40;

  const parsedBorderRadius = parseBorderRadius(borderRadius);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const language = getRandomLanguage();

  ctx.fillStyle = bgColor || "teal";
  ctx.roundRect(0, 0, width, height, parsedBorderRadius);
  ctx.fill();

  const font = getFontForLanguage(language);

  ctx.font = `${fontSize}px "${font}"`;
  ctx.fillStyle = textColor;

  const text = HELLOS[language as keyof typeof HELLOS];
  const textSize = ctx.measureText(text);

  ctx.fillText(
    text,
    width / 2 - textSize.width / 2,
    height / 2 + textSize.actualBoundingBoxAscent / 2
  );

  return canvas;
}

app.get<"/", {}, {}, {}, DrawOptions>(
  "/",
  (req: Request<{}, {}, {}, DrawOptions>, res: Response) => {
    try {
      const canvas = drawHello(req.query);

      res.contentType("image/png");
      res.send(canvas.toBuffer("image/png"));
    } catch (e) {
      console.error(e);
      res.status(400).send("Bad request");
    }
  }
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
