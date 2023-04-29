import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import GenerateCharacter from "../pages/GenerateCharacter";
import GenerateStory from "../pages/GenerateStory";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="character" element={<GenerateCharacter />} />
            <Route path="story" element={<GenerateStory />} />
        </Routes>
    );
};

export default AppRoutes;