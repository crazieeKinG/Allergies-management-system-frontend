const setHeader = (token: string) => {
    return {
        headers: {
            Authorization: "Bearer " + token,
        },
    };
};
export default setHeader;
