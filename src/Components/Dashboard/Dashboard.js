import React from "react";

import { Header } from "../../Components";

const Dashboard = ({ auth }) => {
    return (
        <Header auth={auth} />
    );
}

export default Dashboard;
