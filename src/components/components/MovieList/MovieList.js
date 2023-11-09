import useSWR from "swr";
import { useEffect, useState } from "react";

import { SwiperSlide, Swiper } from "swiper/react";
import { tmdbAPI, fetcher } from "../../../config";
import MovieItem from "../MovieItem/MovieItem";

function MovieList({ type = "now_playing" }) {
    const [movies, setListMovies] = useState([]);

    const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher);

    useEffect(() => {
        if (data && data.results) setListMovies(data.results);
    }, [data]);

    return (
        <div className="movie-list">
            <Swiper
                grabCursor={"true"}
                spaceBetween={40}
                slidesPerView={"auto"}
            >
                {movies.map((item) => (
                    <SwiperSlide key={item.id}>
                        <MovieItem data={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default MovieList;
