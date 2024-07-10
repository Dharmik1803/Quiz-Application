import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "../components/Welcome";
import Quiz from "../Pages/Quiz/Quiz";
import NotFound from "../components/NotFound";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="*" element={<NotFound />} /> {/* Error route */}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
