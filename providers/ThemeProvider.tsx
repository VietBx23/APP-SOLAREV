import { theme } from "@/theme";
import { ThemeProvider } from "@rneui/themed";
import { FC, PropsWithChildren } from "react";

const ThemeProviderCustom: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderCustom;
