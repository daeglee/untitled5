import {format} from "date-fns";
import {DateType} from "../DataType";
import * as config from "../../config";

function TimeFormatter(date, dateType) {
    const interval = 5;

    switch (dateType) {
        case DateType.REAL_TIME:
            if (date.getSeconds() === 0) {
                return format(date, config.SECOND2, config.CURRENT_LOCALE);
            } else if (date.getSeconds() % interval === 0) {
                return format(date, config.SECOND1, config.CURRENT_LOCALE);
            }
            break;
        case DateType.MINUTE:
            if (date.getMinutes() === 0) {
                return format(date, config.MINUTE2, config.CURRENT_LOCALE);
            } else if (date.getMinutes() % interval === 0) {
                return format(date, config.MINUTE1, config.CURRENT_LOCALE);
            }
            break;
        case DateType.HOUR:
            if (date.getHours() === 0) {
                return format(date, config.HOUR2, config.CURRENT_LOCALE);
            } else if (date.getHours() % interval === 0) {
                return format(date, config.HOUR1, config.CURRENT_LOCALE);
            }
            break;

        case DateType.DAY:
            if (date.getDay() === 0) {
                return format(date, config.DAY2, config.CURRENT_LOCALE);
            } else if (date.getDay() % interval === 0) {
                return format(date, config.DAY1, config.CURRENT_LOCALE);
            }
            break;
        case DateType.MONTH:
            if (date.getMonth() === 0) {
                return format(date, config.MONTH2, config.CURRENT_LOCALE);
            } else if (date.getMonth() % interval === 0) {
                return format(date, config.MONTH1, config.CURRENT_LOCALE);
            }
            break;
        default:
            return ""
    }
    return ""
}

export default TimeFormatter;