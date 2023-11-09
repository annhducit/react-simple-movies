import { Fragment } from "react";
import MovieList from "../components/MovieList/MovieList";
import MovieLayoutItem from "../components/MovieLayoutItem/MovieLayoutItem";

function MovieLayout() {
    return (
        <Fragment>
            <MovieLayoutItem heading="Playing now">
                <MovieList />
            </MovieLayoutItem>
            <MovieLayoutItem heading="Top Rated">
                <MovieList type="top_rated" />
            </MovieLayoutItem>
            <MovieLayoutItem heading="Popular">
                <MovieList type="popular" />
            </MovieLayoutItem>
        </Fragment>
    );
}

export default MovieLayout;
