import AlertMessageInterface from "../interfaces/alert.interfaces";

export type ALERT_TYPES = "error" | "success" | "info" | "warning" | undefined;

export const DEFAULT_ALERT_VALUE: AlertMessageInterface = {
    type: undefined,
    message: "",
};
