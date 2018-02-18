import types from './types';

export default Object.freeze({
    create: (todo) => {
        debugger;
        return {
         type:    types.CREATE_TODO,
        payload: todo,
        }
    },
    update: (todo) => ({
        type:    types.UPDATE_TODO,
        payload: todo,
    }),
    delete: (id) => ({
        type:    types.DELETE_TODO,
        payload: id,
    }),
});
