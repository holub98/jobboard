import { GitHub, LinkedIn } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      style={{
        minHeight: "120px",
        backgroundColor: "#faf7f7",
      }}
      justifyContent="center"
    >
      <Typography color="#9c9898">Created by: Gabriel Hołubowicz</Typography>
      <Stack direction="column" gap="4px" alignItems="center">
        <Typography color="#9c9898">gabrielholubowicz98@gmail.com</Typography>
        <Stack direction="row" gap="8px" alignItems="center">
          <IconButton href="https://github.com/holub98" target="_blank">
            <GitHub sx={{ color: "#9c9898" }} />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com/in/holubowiczg"
            target="_blank"
          >
            <LinkedIn sx={{ color: "#9c9898" }} />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
