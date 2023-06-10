export const setLocalStorageItem = (key: string, value: any) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Error saving to localStorage', e);
    }
};

export const getLocalStorageItem = (key: string) => {
    try {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (e) {
        console.error('Error getting data from localStorage', e);
        return null;
    }
};

export const removeLocalStorageItem = (key: string) => {
    try {
        window.localStorage.removeItem(key);
    } catch (e) {
        console.error('Error removing data from localStorage', e);
    }
};