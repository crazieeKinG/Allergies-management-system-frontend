import { ALERT_TYPES } from "../constants/alert.constants";

interface AlertMessageInterface {
    type: ALERT_TYPES;
    message: string;
}

export default AlertMessageInterface;
