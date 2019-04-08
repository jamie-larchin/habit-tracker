import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ icon, ...rest }) => {
    const availableIcons = {
        ChevronLeft: faChevronLeft,
        ChevronRight: faChevronRight
    };

    return <FontAwesomeIcon icon={availableIcons[icon]} {...rest} />;
};

export default Icon;
