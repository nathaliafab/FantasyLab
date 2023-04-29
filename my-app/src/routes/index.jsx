import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import GenerateCharacter from "../pages/GenerateCharacter";
import GenerateBackground from "../pages/GenerateBackground";
import GenerateHistory from "../pages/GenerateHistory";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<Home />} />
            <Route path="character" element={<GenerateCharacter />} />
            <Route path="background" element={<GenerateBackground />} />
            <Route path="history" element={<GenerateHistory />} />
        </Routes>
    );
};

export default AppRoutes;