import React from "react";
import { TaskPriority } from "../../enum/TaskPriority";
import { Box, Card, Typography } from "@mui/material";
import {
  HorizontalRule,
  KeyboardArrowUp,
  KeyboardDoubleArrowUp,
} from "@mui/icons-material";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";

const PriorityBox = ({ priority }) => {
  const style = {
    height: "30px",
    width: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const getPriorityBox = () => {
    switch (priority) {
      case TaskPriority.HIGH: {
        return (
          <Card
            sx={{
              ...style,
              backgroundColor: COLORS.TOAST_ERROR,
            }}
          >
            <KeyboardDoubleArrowUp
              sx={{ color: COLORS.WHITE }}
              color={COLORS.WHITE}
            />
          </Card>
        );
      }
      case TaskPriority.MEDIUM: {
        return (
          <Card
            sx={{
              ...style,
              backgroundColor: COLORS.TOAST_WARNING,
            }}
          >
            <KeyboardArrowUp
              sx={{ color: COLORS.WHITE }}
              color={COLORS.WHITE}
            />
          </Card>
        );
      }
      default: {
        return (
          <Card
            sx={{
              ...style,
              backgroundColor: COLORS.TOAST_INFO,
            }}
          >
            <HorizontalRule sx={{ color: COLORS.WHITE }} color={COLORS.WHITE} />
          </Card>
        );
      }
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {getPriorityBox()}
      <Typography sx={{ fontFamily: FONTS.InterMedium }}>
        {priority}
      </Typography>
    </Box>
  );
};

export default PriorityBox;
