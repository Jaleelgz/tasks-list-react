import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../store/slices/ToastSlice";
import { ToastModes } from "../enum/ToastModes";
import ContainerLayout from "../components/ContainerLayout/ContainerLayout";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showToast({ mode: ToastModes.info, text: "Welcome" }));
  }, []);

  return (
    <ContainerLayout title="Home">
      <div>Hello</div>
    </ContainerLayout>
  );
};

export default Home;
