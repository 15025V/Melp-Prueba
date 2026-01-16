"use client";
import dynamic from "next/dynamic";

const RestaurantMap = dynamic(
  () => import("./RestaurantMap"),
  { ssr: false }
);

export default RestaurantMap;
