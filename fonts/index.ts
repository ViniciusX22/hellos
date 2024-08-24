import { registerFont } from "canvas";

export function registerFonts() {
  registerFont("./fonts/NotoSans-MediumItalic.ttf", {
    family: "Noto Sans",
  });
  registerFont("./fonts/NotoSansJP-Medium.ttf", {
    family: "Noto Sans Japanese",
  });
  registerFont("./fonts/NotoSansKR-Medium.ttf", {
    family: "Noto Sans Korean",
  });
  registerFont("./fonts/NotoSansTC-Medium.ttf", {
    family: "Noto Sans Chinese",
  });
}
