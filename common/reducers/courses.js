const defaultState = [];

export default function courses(state = defaultState, action) {
    switch(action.type) {
        case 'GET_COURSES':
            return [
                ...action.res.data.items
            ];
        default:
            return state;
    }
}
