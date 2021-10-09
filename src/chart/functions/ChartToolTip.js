import {format, toDate} from "date-fns";
import * as config from "../../config";
import React from "react";

function checkPayload(payload) {
    return (<div style={{color: "black"}} key={payload.name}>
        <p>{payload.name}</p>
        <h3>{payload.value.toFixed(0)}%</h3>
    </div>);
}

const ChartToolTip = ({active, payload, label}) => {
    function printPayload() {
        if(payload === null){
            return <></>
        }
        return <>
            {payload.map((value, index) =>
                checkPayload(value)
            )}
        </>;
    }

    if (active) {
        return (
            //TODO: tooltip style
            <div className="tooltip">
                <p>{format(toDate(label * 1000), config.BASIC_TOOLTIP, config.CURRENT_LOCALE)}</p>
                {printPayload()}
            </div>
        );
    }

    return null;
};

export default ChartToolTip;