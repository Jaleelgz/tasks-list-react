import * as React from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { StyledLayout } from "./StyledLayout";
import { CONSTANTS } from "../../constants/constants";
import { Slide } from "@mui/material";
import useWindowDimensions from "../../hooks/useWindowDimesnions";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import Banner from "../../components/Banner/Banner";
import Drawer from "../Drawer/Drawer";

const Layout = () => {
  const drawerOpen = useSelector((state) => state.drawer.value);

  const { width } = useWindowDimensions();

  return (
    <StyledLayout>
      <Box className="navBarParent" style={{ zIndex: 10 }}>
        <Banner />
      </Box>
      <Box
        sx={{ minHeight: { xs: `calc(100vh - ${CONSTANTS.HEADER_HEIGHT}px)` } }}
        className="layoutBody"
      >
        {width < 900 && drawerOpen && <Drawer />}

        <Slide direction="right" in={drawerOpen}>
          <Box
            sx={{
              display: {
                xs: "none",
                md: drawerOpen ? "block" : "none",
                boxShadow: 3,
                zIndex: 5,
              },
            }}
            className="leftSideParent"
          >
            <SideBar />
          </Box>
        </Slide>

        <Box className="rightSideParent" id="rightSideParent">
          <Outlet />
        </Box>
      </Box>
    </StyledLayout>
  );
};

export default Layout;
