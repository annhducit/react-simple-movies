import { Fragment } from "react";
import HomePage from "./components/pages/HomePage";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import MoviePage from "./components/pages/MoviePage";
import MovieDetailPage from "./components/pages/MovieDetailPage";

function App() {
    return (
        <Fragment>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />}></Route>
                </Route>
                <Route path="/movies" element={<MainLayout />}>
                    <Route index element={<MoviePage />}></Route>
                </Route>
                <Route path="/movies/:movieId" element={<MainLayout />}>
                    <Route index element={<MovieDetailPage />}></Route>
                </Route>
            </Routes>
        </Fragment>
    );
}

export default App;
