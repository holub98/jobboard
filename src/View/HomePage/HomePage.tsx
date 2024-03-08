import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { useOffers } from "~/hooks/useOffers";
import { SearchBar } from "~/components";

export const HomePage = () => {
  const { recomendedOffers } = useOffers();

  const recomended = recomendedOffers();
  if (recomended === undefined) {
    return null;
  }

  return (
    <>
      <SearchBar direction="row" toClear={false} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "64px",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Typography variant="h5" color="text.secondary">
          Recomended offers:
        </Typography>
        <Stack direction="row" gap="64px">
          {recomended.map((it) => {
            return (
              <Card key={it._id} sx={{ width: "100%" }}>
                <CardHeader
                  title={it.name}
                  subheader={`${it.earnings.from} - ${it.earnings.to} PLN`}
                />
                <CardContent sx={{ gap: "4px" }}>
                  <Typography variant="h6">Tech stack:</Typography>
                  {it.requirements.slice(0, 3).map((it) => {
                    return <Chip label={it} sx={{ marginRight: "4px" }} />;
                  })}
                </CardContent>

                <CardActions>
                  <Button>More</Button>
                </CardActions>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </>
  );
};
