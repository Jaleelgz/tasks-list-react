import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../store/slices/DrawerSlice";
import {
  Box,
  Card,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { IMAGES } from "../../constants/images";
import { FONTS } from "../../constants/fonts";

function Banner() {
  const dispatch = useDispatch();

  const handleOpenNavMenu = () => {
    dispatch(toggleDrawer());
  };

  return (
    <Card color="white" style={{ position: "sticky", top: 0, left: 0 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              mr: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: { xs: "center", md: "flex-start" },
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={IMAGES.LOGO}
                style={{
                  objectFit: "contain",
                  display: "block",
                  marginRight: "10px",
                }}
                height={40}
                width={40}
                alt="logo"
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: "block",
                  fontFamily: FONTS.InterBold,
                  fontWeight: 700,
                  fontSize: { xs: "12px", md: "18px" },
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                TASKS APP
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </Card>
  );
}
export default Banner;
