import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import GenerateCharacter from "../pages/GenerateCharacter";
import GenerateBackground from "../pages/GenerateBackground";
import GenerateStory from "../pages/GenerateStory";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="character" element={<GenerateCharacter />} />
            <Route path="background" element={<GenerateBackground />} />
            <Route path="story" element={<GenerateStory />} />
        </Routes>
    );
};

export default AppRoutes;