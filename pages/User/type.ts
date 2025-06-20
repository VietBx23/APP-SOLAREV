import { Href } from "expo-router";
import { ReactNode } from "react";

export type IOPTIONS = {
  title: string;
  navigate: Href;
};

export type IOPTIONS_SETTING = {
  title: string;
  component: ReactNode;
};
