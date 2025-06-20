import { Theme, Colors } from "@rneui/base";
import { createTheme } from "@rneui/themed";
import { Button } from "./button";
import { Input } from "./input";
import { TextCustom } from "./text";
import { Tab } from "./tab";
import { Divider } from "./divider";
import { Dialog } from "./dialog";

export const theme = createTheme({
  lightColors: {
    primary: "#144E5E",
    bgDefault: "#D9D9D933",
    text: "#000",
    divider: "rgba(158, 150, 150, .4)",
    error: "#CD1A30",
  },
  darkColors: {
    primary: "#000",
    bgDefault: "#D9D9D933",
    text: "#fff",
    divider: "rgba(158, 150, 150, .4)",
    error: "#CD1A30",
  },
  mode: "light",
  components: { Button, Input, Text: TextCustom, Tab, Divider, Dialog },
});

export type ComponentTheme<P> = (
  props: P,
  theme: Theme & { colors: Colors },
) => Partial<P> | P;
