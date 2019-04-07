import React, { Component } from "react";

class Dashboard extends Component {
    state = {
        profile: {}
    };

    componentDidMount() {
        const { auth } = this.props;
        auth.getProfile((err, profile) => {
            this.setState({ profile });
        });
    }

    render() {
        const { profile } = this.state;
        return <div>Welcome, {profile.name}!</div>;
    }
}

export default Dashboard;
