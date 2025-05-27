// app/fontMap.ts
import {
  inter,
  merriweather,
  lora,
  notoSerif,
  sourceSerif,
  ebGaramond,
} from "./fonts";

export const fontMap = {
  Inter: {
    label: "Inter (Sans)",
    className: "font-inter",
    variable: inter.variable,
  },
  Merriweather: {
    label: "Merriweather (Serif)",
    className: "font-merriweather",
    variable: merriweather.variable,
  },
  Lora: {
    label: "Lora (Serif)",
    className: "font-lora",
    variable: lora.variable,
  },
  "Noto Serif": {
    label: "Noto Serif",
    className: "font-noto-serif",
    variable: notoSerif.variable,
  },
  "Source Serif": {
    label: "Source Serif 4",
    className: "font-source-serif",
    variable: sourceSerif.variable,
  },
  "EB Garamond": {
    label: "EB Garamond",
    className: "font-eb-garamond",
    variable: ebGaramond.variable,
  },
};
