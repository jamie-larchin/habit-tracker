import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, path, auth, ...rest }) => {
    if (!auth.isAuthenticated()) {
        return <Redirect to="/" />;
    }

    return (
        <Route
            path={path}
            render={() => {
                return <Component auth={auth} {...rest} />;
            }}
        />
    );
};

export default PrivateRoute;
