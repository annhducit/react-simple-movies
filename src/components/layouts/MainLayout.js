import { Fragment } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <Fragment>
            <Header />
            <Outlet />
        </Fragment>
    );
}

export default MainLayout;
