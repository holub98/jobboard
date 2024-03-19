import {
  Box,
  Button,
  Divider,
  Drawer,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, MenuRounded } from "@mui/icons-material";
import { logout } from "~/api";
import { useAtomValue } from "jotai";
import { AuthToken, isAuth } from "~/utils/useAuth";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const isLogin = useAtomValue(isAuth);

  const onLogout = async () => {
    await logout();

    navigate("/");
    AuthToken();
  };
  return (
    <Stack
      direction="row"
      sx={(theme) => ({
        minHeight: "60px",
        paddingLeft: "24px",
        backgroundColor: "#faf7f7",
        paddingRight: "24px",
        [theme.breakpoints.up("xl")]: {
          paddingLeft: "300px",
          paddingRight: "300px",
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
      alignItems="center"
      justifyContent="space-between"
    >
      <Link to="/">
        <img src="/job-search.png" />
      </Link>
      <Stack
        direction="row"
        gap={1}
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
        })}
      >
        <Button
          variant="text"
          size="large"
          sx={{ fontWeight: "bold", color: `#9c9898` }}
          href="/offers"
        >
          Offerts
        </Button>
        <Button
          variant="text"
          href="/company"
          size="large"
          sx={{ fontWeight: "bold", color: `#9c9898` }}
        >
          Companies
        </Button>
        {isLogin && (
          <Button
            variant="text"
            href="/me"
            size="large"
            sx={{ fontWeight: "bold", color: `#9c9898` }}
          >
            Account
          </Button>
        )}
        {isLogin ? (
          <Button
            variant="text"
            size="large"
            onClick={onLogout}
            sx={{ fontWeight: "bold", color: `#9c9898` }}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="text"
            href="/login"
            size="large"
            sx={{ fontWeight: "bold", color: `#9c9898` }}
          >
            Login
          </Button>
        )}
      </Stack>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.up("sm")]: {
            display: "none",
          },
        })}
      >
        <Fab
          size="small"
          onClick={() => setIsOpen(true)}
          sx={(theme) => ({
            [theme.breakpoints.up("sm")]: {
              display: "none",
            },
          })}
        >
          <MenuRounded />
        </Fab>
        <Drawer
          anchor="right"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          sx={(theme) => ({
            [theme.breakpoints.up("sm")]: {
              display: "none",
            },
            flexDirection: "column",
          })}
        >
          <Box sx={{ width: "300px" }}>
            <Box sx={{ padding: "10px 32px" }}>
              <Fab size="small" onClick={() => setIsOpen(false)}>
                <ChevronRight />
              </Fab>
            </Box>
            <Divider />
            <List sx={{ display: "flex", flexDirection: "column" }}>
              <ListItem>
                <ListItemButton href="/offers">
                  <ListItemText primary={"Ofers"} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton href="/company">
                  <ListItemText primary={"Companies"} />
                </ListItemButton>
              </ListItem>
              {isLogin && (
                <ListItem>
                  <ListItemButton href="/me">
                    <ListItemText primary={"Account"} />
                  </ListItemButton>
                </ListItem>
              )}
              <ListItem>
                {isLogin ? (
                  <ListItemButton onClick={onLogout}>
                    <ListItemText primary={"Logout"} />
                  </ListItemButton>
                ) : (
                  <ListItemButton href="/">
                    <ListItemText primary={"Login"} />
                  </ListItemButton>
                )}
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
    </Stack>
  );
};
