import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../store/slices/ToastSlice";
import { ToastModes } from "../enum/ToastModes";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showToast({ mode: ToastModes.info, text: "Welcome" }));
  }, []);

  return <div>Home</div>;
};

export default Home;
