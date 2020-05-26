import React from "react";
import Cockpit from "./Cockpit/Cockpit";
import PollList from "./PollList/PollList";

const Layout = () => {
    return (
        <div className="LayoutContainer">
            <Cockpit />
            <PollList />
        </div>
    )
}

export default Layout;