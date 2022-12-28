export const SIGN_IN_CREDENTIALS = {
    email: "email",
    password: "password",
};

export const USER_DATA = {
    name: "Saajan Shrestha",
    email: "saajan.shrestha@gmail.com",
    password: "password",
};

export const UPDATE_USER_DATA = {
    name: "abc Shrestha",
    email: "abc.shrestha@gmail.com",
    password: "password2",
};

export const CHANGE_PASSWORD = "pass";

export const USER_ID = "1";

export const GET_USER_DATA = { id: USER_ID, ...USER_DATA };
export const GET_UPDATE_USER_DATA = { id: USER_ID, ...UPDATE_USER_DATA };

export const SIGN_IN_RESPONSE = {
    data: {
        data: {
            accessToken: "access_token",
        },
    },
};

export const SIGN_OUT_RESPONSE = {
    data: {
        data: {},
    },
};

export const SIGN_UP_RESPONSE = {
    data: {
        data: GET_USER_DATA,
    },
};

export const GET_USER_RESPONSE = {
    data: {
        data: GET_USER_DATA,
    },
};

export const UPDATE_USER_RESPONSE = {
    data: {
        data: GET_UPDATE_USER_DATA,
    },
};

export const CHANGE_PASSWORD_RESPONSE = {
    data: {
        data: {
            password: CHANGE_PASSWORD,
        },
    },
};
