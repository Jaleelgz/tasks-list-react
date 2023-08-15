import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { FONTS } from "../../constants/fonts";
import moment from "moment";
import { COLORS } from "../../constants/colors";
import PriorityBox from "../PriorityBox/PriorityBox";
import { useNavigate } from "react-router-dom";

const TaskListItem = ({ task }) => {
  const navigate = useNavigate();
  return (
    <Button
      sx={{ display: "block", textTransform: "none", textAlign: "left" }}
      onClick={() => navigate(task.id)}
    >
      <Card
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          rowGap: "15px",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <img
            src={`${process.env.REACT_APP_BASE_URL}images/${task.image}`}
            alt={task.heading}
            style={{
              height: "100px",
              width: "150px",
              objectFit: "cover",
              backgroundColor: COLORS.DISABLED_F2,
              borderRadius: "5px",
            }}
          />

          <Typography
            sx={{
              fontFamily: FONTS.InterBold,
              fontSize: "20px",
              textTransform: "uppercase",
            }}
          >
            {task.heading}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontFamily: FONTS.InterRegular,
            fontStyle: "italic",
          }}
        >
          {task.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <PriorityBox priority={task.priority} />

          <Typography
            sx={{ fontFamily: FONTS.InterMedium, color: COLORS.DISABLED_D4 }}
          >
            {moment(task.dateTime).format("DD/MM/YYYY hh:mm a")}
          </Typography>
        </Box>
      </Card>
    </Button>
  );
};

export default TaskListItem;
