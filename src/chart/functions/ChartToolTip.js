import {format, toDate} from "date-fns";
import * as config from "../../config";
import React from "react";

const ChartToolTip = ({active, payload, label}) => {
    if (active) {
        return (
            //TODO: tooltip style
            <div className="tooltip">
                <p>{format(toDate(label * 1000), config.BASIC_TOOLTIP, config.CURRENT_LOCALE)}</p>
                <p>{payload[0].value.toFixed(0)}%</p>
            </div>
        );
    }

    return null;
};

export default ChartToolTip;