import types from 'actions/todo/types';
import todos from 'components/Scheduler/todos';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_TODO:
            debugger;
            return [...state, action.payload];
        case types.UPDATE_TODO:
            return [...state, action.payload];
        case types.DELETE_TODO:
            return [...state, action.payload];
        default:
            return state;
    }
};
