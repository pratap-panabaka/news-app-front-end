import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./pages/News";
import Headlines from "./pages/Headlines";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/headlines" element={<Headlines />} />
      </Routes>
    </BrowserRouter>
  )
}
