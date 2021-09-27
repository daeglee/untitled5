import {format, toDate} from "date-fns";
import * as config from "../../config";
import React from "react";

function checkPayload(payload){
    if(payload !=null && payload[0] !=null)
    return (<p>{payload[0].value.toFixed(0)}%</p>);
}

const ChartToolTip = ({active, payload, label}) => {
    if (active) {
        return (
            //TODO: tooltip style
            <div className="tooltip">
                <p>{format(toDate(label * 1000), config.BASIC_TOOLTIP, config.CURRENT_LOCALE)}</p>
                {checkPayload(payload)}
            </div>
        );
    }

    return null;
};

export default ChartToolTip;