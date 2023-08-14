import { ThemeProvider } from "@mui/material";
import { theme } from "./utils/theme";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TaskItem from "./pages/TaskItem";
import Layout from "./common/Layout/Layout";
import { useSelector } from "react-redux";
import Toast from "./common/Toast/Toast";

function App() {
  const toast = useSelector((state) => state.toast.value);

  return (
    <div>
      <ThemeProvider theme={theme}>
        {toast.visibility && <Toast />}

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route exact index element={<Home />} />

            <Route path=":id" element={<TaskItem />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
