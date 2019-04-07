import React, { Component } from "react";
import { Route, Router } from "react-router-dom";

import { Callback, Dashboard, Header, PrivateRoute } from "..";
import { Auth } from "../../Services";
import history from "../../history";

class Routes extends Component {
    auth = new Auth();

    handleAuthentication = nextState => {
        if (/access_token|id_token|error/.test(nextState.location.hash)) {
            this.auth.handleAuthentication();
        }
    };

    render() {
        const privateRouteProps = {
            exact: true,
            auth: this.auth,
            history
        };

        return (
            <Router history={history}>
                <div>
                    <Route
                        exact
                        path="/callback"
                        render={props => {
                            this.handleAuthentication(props);
                            return <Callback />;
                        }}
                    />
                    <Route
                        path="/"
                        render={() => <Header auth={this.auth} />}
                    />
                    <PrivateRoute
                        path="/dashboard"
                        component={Dashboard}
                        {...privateRouteProps}
                    />
                </div>
            </Router>
        );
    }
}

export default Routes;
