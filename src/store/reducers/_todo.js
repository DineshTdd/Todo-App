import * as todoActions from '../action/_todo';

const initialState = {
    todoList: []
};

export default ( state = initialState, action ) => {
    switch ( action.type ) {
        case todoActions.ADD_TODO:
            var len = state.todoList.length;
            return {
                ...state,
                todoList: state.todoList.concat({id: (len + 1),todo: action.payload.todo})
            };
        case todoActions.DELETE_TODO:
            var newArray = state.todoList.filter(x => (x.id !== action.payload.id))
            var count = 0;
            newArray = newArray.map(x => {
                x.id = ++count
                return x;                
            })
            return {
                todoList: newArray
            }
        default:
            return state;
    }
};
