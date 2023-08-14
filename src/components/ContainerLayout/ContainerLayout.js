import React from "react";
import { Box, Typography } from "@mui/material";
import { FONTS } from "../../constants/fonts";

const ContainerLayout = ({ title, children }) => {
  return (
    <Box sx={{ maxWidth: "xl", mx: "auto", p: 3 }}>
      <Typography
        sx={{
          fontFamily: FONTS.InterBold,
          fontSize: "25px",
          marginBottom: "15px",
        }}
      >
        {title}
      </Typography>

      {children}
    </Box>
  );
};

export default ContainerLayout;
