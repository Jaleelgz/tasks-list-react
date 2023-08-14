import { ThemeProvider } from "@mui/material";
import { theme } from "./utils/theme";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TaskItem from "./pages/TaskItem";
import Layout from "./common/Layout/Layout";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
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
