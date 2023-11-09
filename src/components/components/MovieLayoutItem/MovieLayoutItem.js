import { Fragment } from "react";

function MovieLayoutItem({ children, heading }) {
    return (
        <Fragment>
            <section className="pb-20 movie-layout page-container">
                <h2 className="mb-10 text-3xl font-bold text-white capitalize">
                    {heading}
                </h2>
                {children}
            </section>
        </Fragment>
    );
}

export default MovieLayoutItem;
