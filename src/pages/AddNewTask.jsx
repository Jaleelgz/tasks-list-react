import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ContainerLayout from "../components/ContainerLayout/ContainerLayout";
import CreateUpdateTask from "../components/CreateUpdateTask/CreateUpdateTask";
import { Box, Button, CardMedia } from "@mui/material";
import { Image, Save } from "@mui/icons-material";
import { COLORS } from "../constants/colors";
import { TaskPriority } from "../enum/TaskPriority";

const AddNewTask = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [saveDisable, setSaveDisable] = useState(true);
  const [updateData, setUpdateData] = useState({
    heading: "",
    description: "",
    image: "",
    priority: TaskPriority.LOW,
  });

  const onUpdateTaskFields = (event, mode) => {
    setUpdateData({ ...updateData, [mode]: event.target.value });
  };

  const checkSaveDisable = () => {
    for (const value of Object.values(updateData)) {
      if (value?.toString()?.trim() === "") {
        setSaveDisable(true);
        return;
      }
    }

    setSaveDisable(false);
  };

  useEffect(() => {
    checkSaveDisable();
  }, [updateData]);

  return (
    <ContainerLayout loading={loading} title="Task">
      <Box sx={{ display: "flex", justifyContent: "center", mb: "25px" }}>
        {updateData?.image !== undefined && updateData?.image?.trim() !== "" ? (
          <Box style={Styles.emptyImageContainer}>
            <CardMedia
              sx={Styles.feedsImg}
              component="img"
              image={updateData?.image}
              alt=""
            />
          </Box>
        ) : (
          <Button
            sx={{
              ...Styles.emptyImageContainer,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image sx={{ height: 50, width: 50, color: COLORS.DISABLED_F2 }} />
          </Button>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "15px",
          mb: "25px",
        }}
      >
        <Button disabled={saveDisable} startIcon={<Save />} variant="contained">
          Save
        </Button>
      </Box>

      <CreateUpdateTask onUpdateData={onUpdateTaskFields} data={updateData} />
    </ContainerLayout>
  );
};

export default AddNewTask;

const Styles = {
  emptyImageContainer: {
    height: 150,
    width: 200,
    backgroundColor: COLORS.DISABLED_D4,
    border: "1px solid #000",
  },
  feedsImg: { height: "100%", width: "100%", resizeMode: "contain" },
};
