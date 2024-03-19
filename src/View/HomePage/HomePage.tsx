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

import { useOffers } from "~/hooks";
import { SearchBar, ZeroCountOffer } from "~/components";

export const HomePage = () => {
  const { recomendedOffers } = useOffers();

  const recomended = recomendedOffers();
  if (recomended === undefined) {
    return null;
  }
  return (
    <>
      <SearchBar />
      {recomended ? (
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

          <Stack
            sx={(theme) => ({
              [theme.breakpoints.up("md")]: {
                flexDirection: "row",
              },
              flexDirection: "column",
              gap: "32px",
            })}
          >
            {recomended.map((it) => {
              return (
                <Card key={it._id} sx={{ width: "100%" }}>
                  <CardHeader
                    title={it.name}
                    subheader={`${it.earnings.from} - ${it.earnings.to} PLN`}
                  />
                  <CardContent sx={{ gap: "4px" }}>
                    <Typography variant="h6">Tech stack:</Typography>
                    <Stack gap="4px" flexWrap={"wrap"} direction={"row"}>
                      {it.requirements.slice(0, 3).map((it) => {
                        return (
                          <Chip
                            key={it}
                            label={it}
                            sx={{ marginRight: "4px" }}
                          />
                        );
                      })}
                    </Stack>
                  </CardContent>

                  <CardActions>
                    <Button href={`/offer/${it._id}`}>More</Button>
                  </CardActions>
                </Card>
              );
            })}
          </Stack>
        </Box>
      ) : (
        <ZeroCountOffer />
      )}
    </>
  );
};
