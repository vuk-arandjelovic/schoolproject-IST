import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import AddMovie from "./pages/AddMovie";
import NoPage from "./pages/NoPage";
import React from "react";

export default function App() {
  return (
    <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="Home" element={<Home />} /> */}
          <Route path="Movies" element={<Movies />} />
          <Route path="AddMovie" element={<AddMovie />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </React.StrictMode>

  );
}
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App/>)
// ReactDOM.render(<App />, document.getElementById("root"));