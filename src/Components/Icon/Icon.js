import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowsAlt,
    faChevronLeft,
    faChevronRight,
    faTimes
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ icon, ...rest }) => {
    const availableIcons = {
        ArrowsAlt: faArrowsAlt,
        ChevronLeft: faChevronLeft,
        ChevronRight: faChevronRight,
        Times: faTimes
    };

    return <FontAwesomeIcon icon={availableIcons[icon]} {...rest} />;
};

export default Icon;
