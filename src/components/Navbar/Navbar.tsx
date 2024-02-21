import {
  Box,
  Button,
  Divider,
  Drawer,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { breakTheme } from "../../theme";
import {
  ChevronRight,
  LocalOffer,
  Login,
  Logout,
  MenuRounded,
  Work,
} from "@mui/icons-material";
import { logout } from "~/api";
import { isLoginAuth, useAuth } from "~/hooks";
import { useAtom } from "jotai";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLogin] = useAtom(isLoginAuth);
  const navigate = useNavigate();

  const { isLogout } = useAuth();
  const onLogout = () => {
    logout();
    isLogout();
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };
  return (
    <Stack
      direction="row"
      style={{
        minHeight: "60px",
        background: `${blue[500]}`,
        paddingLeft: "64px",
        paddingRight: "64px",
      }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Link to="/">
        <img src="/job-search.png" />
      </Link>
      <Stack
        direction="row"
        gap={3}
        sx={(theme) => ({
          [theme.breakpoints.down(breakTheme.breakpoints.values.md)]: {
            display: "none",
          },
        })}
      >
        <Button
          variant="text"
          size="large"
          sx={{ fontWeight: "bold", color: `${blue[50]}` }}
          href="/"
        >
          Offerts
        </Button>
        <Button
          variant="text"
          href="/"
          size="large"
          sx={{ fontWeight: "bold", color: `${blue[50]}` }}
        >
          Companies
        </Button>
        {isLogin && (
          <Button
            variant="text"
            href="/my-offerts"
            size="large"
            sx={{ fontWeight: "bold", color: `${blue[50]}` }}
          >
            My offerts
          </Button>
        )}
        {isLogin ? (
          <Fab
            variant="extended"
            size="small"
            color="primary"
            onClick={onLogout}
            sx={{ fontWeight: "bold" }}
          >
            Logout
          </Fab>
        ) : (
          <Fab
            variant="extended"
            size="small"
            color="primary"
            href="/login"
            sx={{ fontWeight: "bold" }}
          >
            Login
          </Fab>
        )}
      </Stack>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.up(breakTheme.breakpoints.values.md)]: {
            display: "none",
          },
          with: 300,
        })}
      >
        <Fab
          size="small"
          onClick={() => setIsOpen(true)}
          sx={(theme) => ({
            [theme.breakpoints.up(breakTheme.breakpoints.values.md)]: {
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
            [theme.breakpoints.up(breakTheme.breakpoints.values.md)]: {
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
            <List>
              <ListItem>
                <ListItemButton href="/">
                  <ListItemIcon>
                    <LocalOffer />
                  </ListItemIcon>
                  <ListItemText primary={"Oferts"} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton href="/">
                  <ListItemIcon>
                    <Work />
                  </ListItemIcon>
                  <ListItemText primary={"Companies"} />
                </ListItemButton>
              </ListItem>
              {isLogin && (
                <ListItem>
                  <ListItemButton href="/my-offerts">
                    <ListItemIcon>
                      <Work />
                    </ListItemIcon>
                    <ListItemText primary={"My offerts"} />
                  </ListItemButton>
                </ListItem>
              )}
              <ListItem>
                {isLogin ? (
                  <ListItemButton onClick={onLogout}>
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    <ListItemText primary={"Logout"} />
                  </ListItemButton>
                ) : (
                  <ListItemButton href="/">
                    <ListItemIcon>
                      <Login />
                    </ListItemIcon>
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
