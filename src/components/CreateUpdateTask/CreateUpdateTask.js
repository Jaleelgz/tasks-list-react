import { Box, MenuItem, TextField } from "@mui/material";
import React from "react";
import { TaskPriority } from "../../enum/TaskPriority";
import moment from "moment";

const CreateUpdateTask = ({ data, onUpdateData }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        rowGap: "25px",
      }}
    >
      <TextField
        fullWidth
        label="Heading *"
        size="medium"
        error={data?.heading?.trim() === ""}
        variant="outlined"
        inputProps={{ maxLength: 30 }}
        value={data?.heading ?? ""}
        onChange={(e) => onUpdateData(e, "heading")}
      />

      <TextField
        fullWidth
        label="Description *"
        multiline
        minRows={4}
        size="medium"
        error={data?.description?.trim() === ""}
        variant="outlined"
        inputProps={{ maxLength: 300 }}
        value={data?.description ?? ""}
        onChange={(e) => onUpdateData(e, "description")}
      />

      <TextField
        select
        label="Priority"
        size="medium"
        value={data?.priority ?? Object.values(TaskPriority)[0]}
        onChange={(e) => onUpdateData(e, "priority")}
        fullWidth
      >
        {Object.values(TaskPriority).map((tmpOption) => (
          <MenuItem
            style={{ textTransform: "capitalize" }}
            key={tmpOption}
            value={tmpOption}
          >
            {tmpOption}
          </MenuItem>
        ))}
      </TextField>

      {data?.dateTime && (
        <TextField
          fullWidth
          label="Date"
          size="medium"
          variant="outlined"
          inputProps={{ readOnly: true, maxLength: 30 }}
          value={moment(data?.dateTime).format("hh:mm a - DD/MM/YYYY")}
        />
      )}
    </Box>
  );
};

export default CreateUpdateTask;
