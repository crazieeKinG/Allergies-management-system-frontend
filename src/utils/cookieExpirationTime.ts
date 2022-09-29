import { ONE_DAY_IN_MILLISECOND } from "../constants/cookie.constants";

const cookieExpirationTime = () => {
    const now = new Date();
    now.setTime(now.getTime() + ONE_DAY_IN_MILLISECOND);

    return { expires: now };
};
export default cookieExpirationTime;
