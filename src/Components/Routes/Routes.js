import React, { Component } from "react";
import { Route, Router } from "react-router-dom";

import { App, Callback } from "..";
import { Auth, History as history } from "../../Services";

class Routes extends Component {
    auth = new Auth();

    handleAuthentication = nextState => {
        if (/access_token|id_token|error/.test(nextState.location.hash)) {
            this.auth.handleAuthentication();
        }
    };

    render() {
        return (
            <Router history={history} component={App}>
                <div>
                    <Route
                        path="/"
                        render={props => <App auth={this.auth} {...props} />}
                    />
                    <Route
                        path="/callback"
                        render={props => {
                            this.handleAuthentication(props);
                            return <Callback {...props} />;
                        }}
                    />
                </div>
            </Router>
        );
    }
}

export default Routes;
