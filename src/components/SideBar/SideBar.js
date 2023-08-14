import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { StyledSideBar } from "./StyledSideBar";
import { Home } from "@mui/icons-material";

const SideBar = () => {
  return (
    <StyledSideBar>
      <List>
        <Tooltip placement="right" title="Home">
          <NavLink className={"normalLink"} to={`/`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  primary="Home"
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </Tooltip>
      </List>
    </StyledSideBar>
  );
};

export default SideBar;
