const updateURLGenerate = (url: string, id: string) => {
    return url.replace(":id", id);
};

export default updateURLGenerate;
