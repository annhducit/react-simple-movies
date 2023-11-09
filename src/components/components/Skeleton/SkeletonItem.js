import { Fragment } from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const ItemSkeleton = () => {
    return (
        <Fragment>
            <div className="flex flex-col h-full p-3 rounded-lg card-movie bg-slate-800">
                <div className="h-[250px] mb-6">
                    <LoadingSkeleton
                        width="100%"
                        height="100%"
                        borderRadius="16px"
                    />
                </div>

                <h3 className="mb-4 text-xl font-semibold text-black">
                    <LoadingSkeleton
                        width="80%"
                        height="30px"
                        borderRadius="4px"
                    />
                </h3>
                <div className="flex items-center justify-between mt-2">
                    <LoadingSkeleton
                        height="10px"
                        width="70px"
                        borderRadius="4px"
                    />
                    <LoadingSkeleton
                        height="10px"
                        width="40px"
                        borderRadius="4px"
                    />
                </div>
                <div className="w-full py-3 mt-3 font-bold text-white rounded-lg">
                    <LoadingSkeleton
                        width="100%"
                        height="48px"
                        borderRadius="4px"
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default ItemSkeleton;
