import { Fragment } from "react";
import MovieLayout from "../layouts/MovieLayout";

import Banner from "../components/Banner/Banner";

function HomePage() {
    return (
        <Fragment>
            <Banner />
            <MovieLayout />
        </Fragment>
    );
}

export default HomePage;
