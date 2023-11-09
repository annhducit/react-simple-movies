import MovieItem from "../components/MovieItem/MovieItem";
import { tmdbAPI } from "../../config";
import useDebounce from "../hooks/UseDebounced";
import ReactPaginate from "react-paginate";
import { fetcher } from "../../config";
import ItemSkeleton from "../components/Skeleton/SkeletonItem";

import useSWR from "swr";
import { useEffect, useState } from "react";

const itemsPerPage = 20;
function MoviePage() {
    const [url, setUrl] = useState(tmdbAPI.getMovieList("popular"));

    const [numberPage, setNumberPage] = useState(1);

    const [keyword, setKeyword] = useState();

    const debounceValue = useDebounce(keyword, 500);

    // Get popular movies and search

    const { data, error } = useSWR(url, fetcher);
    const isLoading = !data && !error;

    useEffect(() => {
        if (debounceValue) {
            setUrl(tmdbAPI.getMovieSearch(debounceValue, numberPage));
        } else {
            setUrl(tmdbAPI.getMovieList("popular", numberPage));
        }
    }, [debounceValue, numberPage]);

    const movies = data?.results || [];

    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        if (!data || !data.total_results) return;

        setPageCount(Math.ceil(data.total_results / itemsPerPage));
    }, [data, itemOffset]);
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.totalPages;
        setItemOffset(newOffset);
        setNumberPage(event.selected + 1);
    };

    return (
        <div className="page-container">
            <div className="flex mb-20">
                <div className="relative flex-1">
                    <input
                        onChange={(e) => setKeyword(e.target.value)}
                        type="text"
                        className="w-full h-full p-4 text-white rounded-tl-sm rounded-bl-sm outline-none bg-slate-600"
                        placeholder="Enter your film..."
                    ></input>
                    {isLoading && (
                        <span className="absolute border-4 rounded-full right-5 w-7 h-7 top-[14px] border-t-transparent border-primary animate-spin"></span>
                    )}
                </div>
                <button className="px-8 py-4 text-white rounded-tr-sm rounded-br-sm bg-primary">
                    Search
                </button>
            </div>
            <div className="grid grid-cols-4 gap-10">
                {movies?.map((item) => (
                    <MovieItem key={item.id} data={item} />
                ))}
            </div>
            {isLoading && (
                <div className="grid grid-cols-4 gap-10">
                    <ItemSkeleton />
                    <ItemSkeleton />
                    <ItemSkeleton />
                    <ItemSkeleton />
                </div>
            )}

            <div className="py-10">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className="pagination"
                />
            </div>
        </div>
    );
}

export default MoviePage;
