import { ReactNode } from "react";
import { Box, Stack } from "@mui/material";
import { Navbar } from "../Navbar";

type Props = { children: ReactNode };

export const LayoutView = ({ children }: Props) => {
  return (
    <Stack height="100vh">
      <Navbar />
      <Box
        flex={1}
        style={{
          paddingTop: "64px",
          paddingLeft: "300px",
          paddingRight: "300px",
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};
