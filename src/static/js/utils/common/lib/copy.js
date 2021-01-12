export const copyArray = array => {
    if (array) {
        try {
            return JSON.parse(JSON.stringify(array));
        } catch (e) {
            return [];
        }
    }
    return array;
};

export const copyObject = object => {
    if (object) {
        try {
            return JSON.parse(JSON.stringify(object));
        } catch (e) {
            return {};
        }
    }
    return object;
};
