import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ContainerLayout from "../components/ContainerLayout/ContainerLayout";
import { useNavigate, useParams } from "react-router-dom";
import CreateUpdateTask from "../components/CreateUpdateTask/CreateUpdateTask";
import { Box, Button, CardMedia } from "@mui/material";
import { Delete, Image, Save } from "@mui/icons-material";
import { COLORS } from "../constants/colors";
import { deleteData, getData, putData } from "../utils/restUtils";
import { showToast } from "../store/slices/ToastSlice";
import { ToastModes } from "../enum/ToastModes";

const TaskItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [saveDisable, setSaveDisable] = useState(true);
  const [actualItem, setActualItem] = useState({});
  const [updateData, setUpdateData] = useState({});
  const { id } = useParams();

  const getTaskItem = async () => {
    setLoading(true);

    const tasksRes = await getData(`task/${id}`);

    if (!tasksRes || tasksRes?.status || tasksRes?.statusCode) {
      dispatch(
        showToast({
          mode: ToastModes.error,
          text: tasksRes?.data?.message ?? "Failed to fetch task.Try again!",
        })
      );
      setLoading(false);
      return;
    }

    setActualItem(tasksRes);
    setUpdateData(tasksRes);
    setLoading(false);
  };

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

    if (
      actualItem.heading !== updateData?.heading ||
      actualItem.description !== updateData?.description ||
      actualItem.priority !== updateData?.priority
    ) {
      setSaveDisable(false);
    } else {
      setSaveDisable(true);
    }
  };

  const updateTask = async () => {
    setLoading(true);

    const updateTaskRes = await putData(`task/${id}`, updateData);

    if (!updateTaskRes || updateTaskRes?.status || updateTaskRes?.statusCode) {
      dispatch(
        showToast({
          mode: ToastModes.error,
          text:
            updateTaskRes?.data?.message ?? "Failed to update task.Try again!",
        })
      );
      setLoading(false);
      return;
    }

    dispatch(
      showToast({
        mode: ToastModes.success,
        text: "Task updated successfully!.",
      })
    );
    setLoading(false);
    navigate("/");
  };

  const deleteTask = async () => {
    setLoading(true);

    const deleteTaskRes = await deleteData(`task/${id}`);

    if (!deleteTaskRes || deleteTaskRes?.status || deleteTaskRes?.statusCode) {
      dispatch(
        showToast({
          mode: ToastModes.error,
          text:
            deleteTaskRes?.data?.message ?? "Failed to delete task.Try again!",
        })
      );
      setLoading(false);
      return;
    }

    dispatch(
      showToast({
        mode: ToastModes.success,
        text: "Task deleted successfully!.",
      })
    );
    setLoading(false);
    navigate("/");
  };

  useEffect(() => {
    checkSaveDisable();
  }, [updateData]);

  useEffect(() => {
    getTaskItem();
  }, [id]);

  return (
    <ContainerLayout loading={loading} title="Task">
      <Box sx={{ display: "flex", justifyContent: "center", mb: "25px" }}>
        {updateData.image !== undefined && updateData.image?.trim() !== "" ? (
          <Box style={Styles.emptyImageContainer}>
            <CardMedia
              sx={Styles.feedsImg}
              component="img"
              image={`${process.env.REACT_APP_BASE_URL}images/${updateData.image}`}
              alt=""
            />
          </Box>
        ) : (
          <Box
            sx={{
              ...Styles.emptyImageContainer,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image sx={{ height: 50, width: 50, color: COLORS.DISABLED_F2 }} />
          </Box>
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
        <Button onClick={deleteTask} startIcon={<Delete />} variant="outlined">
          Delete
        </Button>

        <Button
          onClick={updateTask}
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

export default TaskItem;

const Styles = {
  emptyImageContainer: {
    height: 150,
    width: 200,
    backgroundColor: COLORS.DISABLED_D4,
    border: "1px solid #000",
  },
  feedsImg: { height: "100%", width: "100%", resizeMode: "contain" },
};
