const keys = {
    SESSION: 'Session',
    TOKEN: 'token'
};

export const setSession = session =>
    localStorage.setItem(keys.SESSION, JSON.stringify(session));

export const getSession = () => JSON.parse(localStorage.getItem(keys.SESSION));

export const setToken = token =>
    localStorage.setItem(keys.TOKEN, token);

export const getToken = () => localStorage.getItem(keys.TOKEN);