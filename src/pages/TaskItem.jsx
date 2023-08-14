import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ContainerLayout from "../components/ContainerLayout/ContainerLayout";

const TaskItem = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  return (
    <ContainerLayout loading={loading} title="Task">
      <div>Task</div>
    </ContainerLayout>
  );
};

export default TaskItem;
