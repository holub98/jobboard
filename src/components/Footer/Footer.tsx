import { GitHub, LinkedIn } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

export const Footer = () => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      style={{
        minHeight: "120px",
        background: `${blue[500]}`,
      }}
      justifyContent="center"
    >
      <Typography>Created by: Gabriel Hołubowicz</Typography>
      <Stack direction="column" gap="4px" alignItems="center">
        <Typography>gabrielholubowicz98@gmail.com</Typography>
        <Stack direction="row" gap="8px" alignItems="center">
          <IconButton href="https://github.com/holub98">
            <GitHub />
          </IconButton>
          <IconButton href="https://github.com/holub98">
            <LinkedIn />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
