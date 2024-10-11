import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Layout from "./pages/Dashboard/Layout";
import MainBody from "./pages/Dashboard/MainBody";
import { SafeRoute } from "./pages/ProtectedRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<SafeRoute />}>
          <Route element={<Layout />}>
            <Route path="/invoice" element={<MainBody />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
