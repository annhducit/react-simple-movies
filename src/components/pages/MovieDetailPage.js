import { useParams } from "react-router-dom";
import images from "../../images";

import { apiKey, fetcher, tmdbAPI } from "../../config";

import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieItem from "../components/MovieItem/MovieItem";

function MovieDetailPage() {
    const { movieId } = useParams();

    const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);

    if (!data) return null;
    return (
        <div className="py-10">
            <div className="h-[600px] w-full relative mb-10">
                <div className="absolute inset-0 bg-black overlay bg-opacity-70"></div>
                <div
                    className="w-full h-full bg-no-repeat bg-cover"
                    style={{
                        backgroundImage: `url(${images.pathImage}${data.backdrop_path})`,
                    }}
                ></div>
            </div>
            <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative">
                <img
                    src={`${images.pathImage}${data.backdrop_path}`}
                    alt=""
                    className="w-full h-full rounded-lg"
                ></img>
            </div>
            <h1 className="pt-10 mb-10 text-4xl font-bold text-center text-white">
                {data.title}
            </h1>
            {data.genres && (
                <div className="flex items-center justify-center gap-5 mb-10">
                    {data.genres.map((item) => (
                        <span
                            key={item.id}
                            className="px-4 py-2 border rounded-md border-primary"
                        >
                            {item.name}
                        </span>
                    ))}
                </div>
            )}
            <p className="leading-relaxed max-w-[600px] text-center mx-auto mb-10">
                {data.overview}
            </p>
            <h1 className="pt-10 mb-10 text-3xl font-bold text-center text-white">
                Cast
            </h1>
            <CastItem />
            <h1 className="pt-10 mb-10 text-3xl font-bold text-center text-white">
                Trailer
            </h1>
            <MovieVideo />
            <h1 className="pt-10 mb-10 text-3xl font-bold text-center text-white">
                Similar Movies
            </h1>
            <SimilarMovie />
        </div>
    );
}

export default MovieDetailPage;

const CastItem = () => {
    const { movieId } = useParams();
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
        fetcher
    );
    if (!data) return null;
    if (!data.cast) return null;

    const casts = data.cast;
    return (
        <div className="grid grid-cols-4 gap-5 pb-10">
            {casts.slice(0, 8).map((cast) => (
                <div
                    key={cast.id}
                    className="flex flex-col p-4 rounded-lg cast-item bg-slate-800"
                >
                    <div className="w-full h-[400px] rounded-lg">
                        {cast.profile_path ? (
                            <img
                                src={`${images.pathImage}${cast.profile_path}`}
                                alt=""
                                className="object-cover w-full h-full rounded-lg"
                            ></img>
                        ) : (
                            <img
                                src={images.default}
                                alt=""
                                className="object-cover w-full h-full rounded-lg"
                            ></img>
                        )}
                    </div>
                    <p className="mx-auto mt-4 text-lg font-bold">
                        {cast.name}
                    </p>
                </div>
            ))}
        </div>
    );
};

const MovieVideo = () => {
    const { movieId } = useParams();
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
        fetcher
    );
    if (!data) return null;
    if (!data.results) return null;
    const videos = data.results;
    return (
        <div className="flex flex-col gap-20 mb-10 movie-video">
            {videos.slice(0, 5).map((video) => (
                <div key={video.id} className="w-full mb-10 aspect-video">
                    <span className="px-6 py-3 text-lg font-bold bg-purple-600 rounded-md">
                        {video.name}
                    </span>
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title="What is Karma according to Buddhism ?| Buddhism In English"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="mt-5"
                    ></iframe>
                </div>
            ))}
        </div>
    );
};

const SimilarMovie = () => {
    const { movieId } = useParams();
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`,
        fetcher
    );
    if (!data) return null;
    if (!data.results) return null;
    const movies = data.results;

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
};
