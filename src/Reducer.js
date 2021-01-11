const Reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                error: null
            };
        case 'LOGIN_FAILED':
            return {
                ...state,
                isAuthenticated: false,
                error: action.error
            }
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                error: null
            }
        case 'REGISTER_FAILED':
            return {
                ...state,
                isAuthenticated: false,
                error: action.error
            }
        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                users: action.payload,
                error: null
            }
        case 'GET_USERS_FAILED':
            return {
                ...state,
                users: [],
                error: action.error
            }
        case 'ADD_NEW_USER':
            return {
                ...state,
                users: [...state.users, action.payload],
                error: null
            }
        case 'UPDATE_USER_LIST':
            const updatedUsers = [];
            for (const user of state.users) {
                if (user._id === action.payload._id) {
                    updatedUsers.push(action.payload);
                } else {
                    updatedUsers.push(user);
                }
            }

            return {
                ...state,
                users: updatedUsers,
                error: null
            }
        case 'DELETE_USER_SUCCESS':
            const deletedUserList = state.users.filter(user => user._id !== action.payload._id);

            return {
                ...state,
                users: [...deletedUserList],
                error: null
            }
        case 'DELETE_USER_FAILED':
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
};

export default Reducer;