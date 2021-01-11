const { getToken } = require('../helper/auth.service');
const token = getToken();

export const apiOption = {
    headers: { Authorization: `Bearer ${token}` }
};