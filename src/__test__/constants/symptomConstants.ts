export const SYMPTOM_DATA = {
    symptom: "symptom 1",
};

export const SYMPTOM_ID = "1";

export const ADD_SYMPTOM_RESPONSE = {
    data: {
        data: { id: SYMPTOM_ID, ...SYMPTOM_DATA },
    },
};

export const UPDATE_SYMPTOM_RESPONSE = {
    data: {
        data: { id: SYMPTOM_ID, ...SYMPTOM_DATA },
    },
};

export const DELETE_SYMPTOM_RESPONSE = {
    data: {
        data: { id: SYMPTOM_ID, ...SYMPTOM_DATA },
    },
};
