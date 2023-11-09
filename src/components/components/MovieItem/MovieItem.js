import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import images from "../../../images";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

function MovieItem({ data }) {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-full p-3 rounded-lg card-movie bg-slate-800">
            {data.poster_path ? (
                <img
                    className="object-cover w-full h-[250px] mb-5 rounded-lg"
                    src={`${images.pathImage}${data.poster_path}`}
                    alt=""
                ></img>
            ) : (
                <img
                    className="object-cover w-full h-[250px] mb-5 rounded-lg"
                    src={images.default}
                    alt=""
                ></img>
            )}
            <div className="flex flex-col flex-1">
                <h3 className="mb-3 text-xl font-bold text-white">
                    {data.original_title}
                </h3>
                <div className="flex items-center justify-between mb-5 text-sm text-white">
                    <span className="opacity-50">{data.release_date}</span>
                    <div className="flex items-center gap-2">
                        <span className="opacity-50">{data.vote_average}</span>
                        <span>
                            <FontAwesomeIcon
                                icon={faStar}
                                className="text-yellow-400"
                            />
                        </span>
                    </div>
                </div>
                <Button onClick={() => navigate(`/movies/${data.id}`)}>
                    Watch now
                </Button>
            </div>
        </div>
    );
}

export default MovieItem;
