import { CSSProperties } from "react";

interface IFilter {
  name: string;
  style: CSSProperties;
}

export const filter: IFilter[] = [
  {
    name: "Normal",
    style: {
      filter: "none",
    },
  },
  {
    name: "Oldskool",
    style: {
      filter: "grayscale(100%)",
    },
  },
  {
    name: "Sepia",
    style: {
      filter: "sepia(100%)",
    },
  },
  {
    name: "Hulk",
    style: {
      filter: "hue-rotate(90deg)",
    },
  },
  {
    name: "Blur",
    style: {
      filter: "url(#blur)",
    },
  },
  {
    name: "Bright",
    style: {
      filter: "brightness(200%)",
    },
  },
  {
    name: "Opacity",
    style: {
      filter: "opacity(50%)",
    },
  },
  {
    name: "Thermal",
    style: {
      filter: `invert(1) url(#thermal)`,
    },
  },
  {
    name: "Night",
    style: {
      filter: `invert(1)`,
    },
  },
  {
    name: "Grain",
    style: {
      filter: "url(#grain)",
    },
  },
  {
    name: "Old Grainy",
    style: {
      filter: "url(#grainy) grayscale(0.6) sepia(0.5) brightness(1.5)",
    },
  },
  {
    name: "Turbulence",
    style: {
      filter: "url(#turbulence)",
    },
  },
  {
    name: "Noise",
    style: {
      filter: "url(#noise)",
    },
  },
  {
    name: "Convolve",
    style: {
      filter: "url(#convolve)",
    },
  },
  {
    name: "VHS",
    style: {
      filter: "url(#vhs)",
    },
  },
];
