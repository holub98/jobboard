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
          padding: "64px",
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};
