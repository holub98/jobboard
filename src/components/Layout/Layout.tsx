import { ReactNode } from "react";
import { Box, Stack } from "@mui/material";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

type Props = { children: ReactNode };

export const LayoutView = ({ children }: Props) => {
  return (
    <Stack height="100vh">
      <Navbar />
      <Box
        flex={1}
        sx={(theme) => ({
          paddingTop: "64px",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "64px",
          backgroundColor: "#faf7f7",
          [theme.breakpoints.up("xl")]: {
            paddingLeft: "350px",
            paddingRight: "350px",
          },
          [theme.breakpoints.up("lg")]: {
            paddingLeft: "150px",
            paddingRight: "150px",
          },
          [theme.breakpoints.up("md")]: {
            paddingLeft: "96px",
            paddingRight: "96px",
          },
          [theme.breakpoints.up("sm")]: {
            paddingLeft: "64px",
            paddingRight: "64px",
          },
        })}
      >
        {children}
      </Box>
      <Footer />
    </Stack>
  );
};
