/** @format */

import img1 from "../assets/chakam_image/1.jpg";
import img2 from "../assets/chakam_image/2.jpg";
import img3 from "../assets/chakam_image/3.jpg";
import img4 from "../assets/chakam_image/4.jpg";
import img5 from "../assets/chakam_image/5.jpg";
import img6 from "../assets/chakam_image/6.jpg";
import img7 from "../assets/chakam_image/7.jpg";
import img8 from "../assets/chakam_image/8.jpg";
import img9 from "../assets/chakam_image/9.jpg";
import img10 from "../assets/chakam_image/10.jpg";

type Direction = "up" | "down" | "left" | "right";

export interface Image {
  id: number;
  image: string;
  side: string;
  direction: Direction;
}

export const ChakamImage: Image[] = [
  {
    id: 1,
    image: img1,
    side: "left",
    direction: "right",
  },
  {
    id: 2,
    image: img2,
    side: "right",
    direction: "left",
  },
  {
    id: 3,
    image: img3,
    side: "left",
    direction: "right",
  },
  {
    id: 4,
    image: img4,
    side: "right",
    direction: "left",
  },
  {
    id: 5,
    image: img5,
    side: "left",
    direction: "right",
  },
  {
    id: 6,
    image: img6,
    side: "right",
    direction: "left",
  },
  {
    id: 7,
    image: img7,
    side: "left",
    direction: "right",
  },
  {
    id: 8,
    image: img8,
    side: "right",
    direction: "left",
  },
  {
    id: 9,
    image: img9,
    side: "left",
    direction: "right",
  },
  {
    id: 10,
    image: img10,
    side: "right",
    direction: "left",
  },
];
