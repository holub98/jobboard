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
import { Controller, useForm } from "react-hook-form";
import { FilterType, filterSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { tech } from "~/utils/technologies";
import { useNavigate } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { filterAtom } from "~/utils/filterSearch";

type Props = {
  direction: "row" | "column";
};

const toggleAtom = atom<boolean>(false);

export const SearchBar = ({ direction }: Props) => {
  const navigate = useNavigate();

  const [check, setCheck] = useAtom(toggleAtom);

  const [filter, setFilter] = useAtom(filterAtom);

  const { control, register, handleSubmit, setValue, reset } =
    useForm<FilterType>({
      defaultValues: filter,
      resolver: zodResolver(filterSchema),
    });
  const checkToggle = () => {
    setCheck((prev) => !prev);
    if (check) {
      setValue("workDirection", "");
    } else {
      setValue("workDirection", "Remote");
    }
  };
  const onSubmit = async (data: FilterType) => {
    setFilter(data);
    navigate("/offers");
  };

  const onClear = () => {
    setCheck(false);
    reset();
    setFilter({
      name: "",
      requirements: [],
      workDirection: "",
      localization: "",
    });
  };
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
      <Stack direction={`${direction}`} justifyContent={"space-between"}>
        <Stack direction={`${direction}`} gap="8px">
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
                  {...field}
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
                  onChange={() => checkToggle()}
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
        <Button onClick={onClear} sx={{ height: "56px" }}>
          Clear
        </Button>
        <Button sx={{ height: "56px" }} type="submit">
          Search
        </Button>
      </Stack>
    </Box>
  );
};
