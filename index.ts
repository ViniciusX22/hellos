// src/index.js
import express, { Request, Response } from "express";
import { Canvas, createCanvas, registerFont } from "canvas";
import dotenv from "dotenv";
import hellos from "./hellos.json";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

registerFont("./fonts/NotoSans-MediumItalic.ttf", {
  family: "Noto Sans",
});

function drawHello({
  width = 300,
  height = 200,
  fontSize = 40,
  bgColor = "teal",
  textColor = "white",
}: {
  width?: number | string;
  height?: number | string;
  fontSize?: number | string;
  bgColor?: string;
  textColor?: string;
}): Canvas {
  width = Number(width) || 300;
  height = Number(height) || 200;
  fontSize = Number(fontSize) || 40;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = bgColor || "teal";
  ctx.fillRect(0, 0, width, height);

  ctx.font = `${fontSize}px "Noto Sans"`;
  ctx.fillStyle = textColor;

  const text = hellos[Math.floor(Math.random() * hellos.length)];
  const textSize = ctx.measureText(text);
  console.log(text);
  ctx.fillText(
    text,
    width / 2 - textSize.width / 2,
    height / 2 + textSize.actualBoundingBoxAscent / 2
  );

  return canvas;
}

app.get("/", (req: Request, res: Response) => {
  try {
    const canvas = drawHello(req.query);

    res.contentType("image/png");
    res.send(canvas.toBuffer("image/png"));
  } catch (e) {
    console.error(e);
    res.status(400).send("Bad request");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
