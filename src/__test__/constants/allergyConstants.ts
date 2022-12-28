export const ALLERGY_DATA = [
    {
        name: "Allergy 1",
    },
    {
        name: "Allergy 2",
    },
    {
        name: "Allergy 3",
    },
];

export const NEW_ALLERGY_DATA = {
    name: "Allergy 4",
};

export const ALLERGY_ID = "1";

export const GET_ALLERGY_RESPONSE = {
    data: {
        data: ALLERGY_DATA,
    },
};

export const INSERT_ALLERGY_RESPONSE = {
    data: { data: { id: ALLERGY_ID, ...NEW_ALLERGY_DATA } },
};

export const UPDATE_ALLERGY_RESPONSE = {
    data: { data: { id: ALLERGY_ID, ...NEW_ALLERGY_DATA } },
};

export const DELETE_ALLERGY_RESPONSE = {
    data: { data: { id: ALLERGY_ID, ...NEW_ALLERGY_DATA } },
};
