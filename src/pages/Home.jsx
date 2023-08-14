import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ContainerLayout from "../components/ContainerLayout/ContainerLayout";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add, Search } from "@mui/icons-material";
import { TaskPriorityFilterOptions } from "../enum/TaskPriority";
import { getData } from "../utils/restUtils";
import { showToast } from "../store/slices/ToastSlice";
import { ToastModes } from "../enum/ToastModes";
import { Tasks } from "../constants/Tasks";
import TaskListItem from "../components/TaskListItem/TaskListItem";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState(
    TaskPriorityFilterOptions[0]
  );

  const searchNFilterTasks = (event, mode) => {
    if (mode === "search") {
      if (event.target.value?.length > 15) {
        return;
      }

      setSearch(event.target.value);
    } else {
      setPriorityFilter(event.target.value);
    }

    let tempFilteredList = tasks.filter((tmpRecord) => {
      if (
        tmpRecord.heading
          ?.toLowerCase()
          ?.includes(
            mode === "search"
              ? event.target.value?.toLowerCase()
              : search?.toLowerCase()
          )
      ) {
        return tmpRecord;
      }
    });

    if (
      mode === "search"
        ? priorityFilter !== TaskPriorityFilterOptions[0]
        : event.target.value !== TaskPriorityFilterOptions[0]
    ) {
      tempFilteredList = tempFilteredList.filter(
        (tmpTask) =>
          tmpTask.priority ===
          (mode === "search" ? priorityFilter : event.target.value)
      );
    }

    setFilteredTasks(tempFilteredList);
  };

  const getTasks = async () => {
    setLoading(true);

    // const tasksRes = await getData("task/all");

    // console.log("tasksRes :",tasksRes)

    // if (!tasksRes || tasksRes?.status || tasksRes?.statusCode) {
    //   dispatch(
    //     showToast({
    //       mode: ToastModes.error,
    //       text: "Failed to fetch tasks.Try again!",
    //     })
    //   );
    //   setLoading(false);
    //   return;
    // }

    const tasksRes = Tasks;

    setTasks(tasksRes);
    setFilteredTasks(tasksRes);
    setLoading(false);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <ContainerLayout loading={loading} title="Home">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          rowGap: "15px",
          columnGap: "10px",
          my: 2,
          flexWrap: "wrap",
        }}
      >
        <Button
          onClick={() => navigate("add_substation")}
          startIcon={<Add />}
          variant="contained"
        >
          Add new
        </Button>

        <Box
          sx={{
            display: "flex",
            rowGap: "15px",
            columnGap: "10px",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              rowGap: "15px",
              columnGap: "10px",
            }}
          >
            <TextField
              select
              label="Priority Filter"
              value={priorityFilter}
              onChange={(e) => searchNFilterTasks(e, "filter")}
              sx={{ width: "150px" }}
            >
              {TaskPriorityFilterOptions.map((tmpOption) => (
                <MenuItem
                  style={{ textTransform: "capitalize" }}
                  key={tmpOption}
                  value={tmpOption}
                >
                  {tmpOption}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: { xs: "auto", md: "400px" },
            }}
          >
            <InputBase
              value={search}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => searchNFilterTasks(e, "search")}
            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <Search />
            </IconButton>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "15px",mt:"15px" }}>
        {filteredTasks.map((taskItem) => (
          <TaskListItem key={taskItem.id} task={taskItem} />
        ))}
      </Box>
    </ContainerLayout>
  );
};

export default Home;
