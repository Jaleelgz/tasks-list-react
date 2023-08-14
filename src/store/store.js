import { configureStore } from "@reduxjs/toolkit";
import ToastSlice from "./slices/ToastSlice";
import DrawerSlice from "./slices/DrawerSlice";

export default configureStore({
  reducer: {
    toast: ToastSlice,
    drawer: DrawerSlice,
  },
  devTools: process.env.NODE_ENV === "development",
});
