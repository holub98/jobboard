import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Stack,
  TextField,
  ToggleButton,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

export const SearchBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: "0px 0px 010px 0px #D2D2E0",
        padding: "48px 24px 48px 24px",
        justifyContent: "center",
        alignItem: "center",
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5">Find your dream work</Typography>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} gap="8px">
          <TextField
            label="Job title, keyword"
            {...register("name")}
            sx={{ width: "400px" }}
          />
          <FormControl>
            <Controller
              name="requirements"
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <Autocomplete
                  onChange={(_, newValue) => {
                    if (newValue !== null) field.onChange(newValue);
                  }}
                  onBlur={field.onBlur}
                  multiple
                  filterSelectedOptions
                  options={tech}
                  value={field.value || undefined}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tech"
                      placeholder="Tech"
                      sx={{ width: "400px" }}
                    />
                  )}
                />
              )}
            />
          </FormControl>

          <FormControl>
            <Controller
              name="workDirection"
              control={control}
              render={() => (
                <ToggleButton
                  value="remote"
                  selected={check}
                  onChange={() => checkToggle(check)}
                  sx={{
                    height: "56px",
                  }}
                >
                  Remote
                </ToggleButton>
              )}
            />
          </FormControl>

          <TextField label="Localization" {...register("localization")} />
        </Stack>
        <Button sx={{ height: "56px" }} type="submit">
          Search
        </Button>
      </Stack>
    </Box>
  );
};
