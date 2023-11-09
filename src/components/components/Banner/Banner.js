import { useState, useEffect } from "react";
import useSWR from "swr";
import { apiKey, fetcher, tmdbAPI } from "../../../config";
import { SwiperSlide, Swiper } from "swiper/react";
import { useNavigate } from "react-router-dom";

import images from "../../../images";
import Button from "../Button/Button";

function Banner() {
    const [banners, setListBanners] = useState([]);

    const { data } = useSWR(tmdbAPI.getMovieList("upcoming"), fetcher);

    useEffect(() => {
        if (data && data.results) setListBanners(data.results);
    }, [data]);

    return (
        <section className="banner h-[500px] page-container mb-20">
            <Swiper grabCursor={"true"} slidesPerView={"auto"}>
                {banners.map((item) => (
                    <SwiperSlide key={item.id}>
                        <BannerItem data={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default Banner;

function BannerItem({ data }) {
    const navigate = useNavigate();

    const { data: list } = useSWR(
        `https://api.themoviedb.org/3/movie/${data.id}?api_key=${apiKey}`,
        fetcher
    );

    if (!list) return null;
    return (
        <div className="relative w-full h-full rounded-lg">
            <div className="overlay inset-0 absolute bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
            <img
                src={`${images.pathImage}${data.poster_path}`}
                alt=""
                className="object-cover object-top w-full h-full rounded-lg"
            ></img>
            <div className="absolute w-full text-white bottom-5 left-5">
                <h2 className="mb-5 text-3xl font-bold">
                    {data.original_title}
                </h2>
                {list.genres && (
                    <div className="flex items-center mb-8 gap-x-3">
                        {list.genres.map((item) => (
                            <span
                                key={item.id}
                                className="px-4 py-2 border border-white rounded-md"
                            >
                                {item.name}
                            </span>
                        ))}
                    </div>
                )}
                <Button
                    className="px-6 font-medium"
                    onClick={() => navigate(`/movies/${data.id}`)}
                >
                    Watch now
                </Button>
            </div>
        </div>
    );
}
