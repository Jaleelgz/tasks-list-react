import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ContainerLayout from "../components/ContainerLayout/ContainerLayout";
import CreateUpdateTask from "../components/CreateUpdateTask/CreateUpdateTask";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import { Image, Save } from "@mui/icons-material";
import { COLORS } from "../constants/colors";
import { TaskPriority } from "../enum/TaskPriority";
import { postData, upload } from "../utils/restUtils";
import { showToast } from "../store/slices/ToastSlice";
import { ToastModes } from "../enum/ToastModes";
import { useNavigate } from "react-router-dom";
import { FONTS } from "../constants/fonts";
import { uploadImageToServer } from "../utils/imageUtils";

const AddNewTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleUploadClick = (event) => {
    const files = event.target.files;

    if (!files || files?.length === 0) {
      return;
    }

    let image = URL.createObjectURL(event.target.files[0]);

    setUpdateData({ ...updateData, image });
  };

  const checkSaveDisable = () => {
    for (const key of Object.keys(updateData)) {
      if (updateData[key]?.toString()?.trim() === "") {
        setSaveDisable(true);
        return;
      }
    }

    setSaveDisable(false);
  };

  const uploadImage = async () => {
    setLoading(true);

    const uploadRes = await uploadImageToServer(updateData.image);

    if (!uploadRes || uploadRes?.status || uploadRes?.statusCode) {
      dispatch(
        showToast({
          mode: ToastModes.error,
          text: uploadRes?.data?.message ?? "Failed to upload image.Try again!",
        })
      );
      setLoading(false);
      return;
    }

    return uploadRes;
  };

  const addNewTask = async () => {
    if (!updateData.image || updateData.image?.trim() === "") {
      dispatch(
        showToast({
          mode: ToastModes.error,
          text: "Image required!",
        })
      );
      return;
    }

    const imgUrl = await uploadImage();

    if (!imgUrl) {
      return;
    }

    setLoading(true);

    const addTaskRes = await postData("task", {
      ...updateData,
      image: imgUrl,
    });

    if (!addTaskRes || addTaskRes?.status || addTaskRes?.statusCode) {
      dispatch(
        showToast({
          mode: ToastModes.error,
          text: addTaskRes?.data?.message ?? "Failed to add task.Try again!",
        })
      );
      setLoading(false);
      return;
    }

    dispatch(
      showToast({ mode: ToastModes.success, text: "Task added successfully!." })
    );
    setLoading(false);
    navigate("/");
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
          <>
            <input
              style={{ display: "none" }}
              accept="image/*"
              id="contained-button-file"
              type="file"
              onChange={handleUploadClick}
            />
            <label htmlFor="contained-button-file">
              <Box
                sx={{
                  ...Styles.emptyImageContainer,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textTransform: "none",
                  flexDirection: "column",
                  cursor: "pointer",
                }}
              >
                <Image
                  sx={{ height: 50, width: 50, color: COLORS.DISABLED_F2 }}
                />
                <Typography sx={{ fontFamily: FONTS.InterMedium }}>
                  Add image
                </Typography>
              </Box>
            </label>
          </>
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
        <Button
          onClick={addNewTask}
          disabled={saveDisable}
          startIcon={<Save />}
          variant="contained"
        >
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
