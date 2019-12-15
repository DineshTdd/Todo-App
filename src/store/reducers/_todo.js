import * as todoActions from '../action/_todo';

const initialState = {
    todoList: [],
    todoActiveList:[],
    todoCompletedList: []
};

export default ( state = initialState, action ) => {
    switch ( action.type ) {
        case todoActions.ADD_TODO:
            var len = state.todoList.length;
            return {
                ...state,
                todoList: state.todoList.concat({id: (len + 1),todo: action.payload.todo, completed: false})
            };
        case todoActions.DELETE_TODO:
            var newArray = state.todoList.filter(x => (x.id !== action.payload.id))
            var count = 0;
            newArray = newArray.map(x => {
                x.id = ++count
                return x;                
            })
            return {
                ...state,
                todoList: newArray
            }
        case todoActions.ALL_TODOS:
            return {
                ...state,
                todoList: state.todoList.filter(x => x)
            }
        case todoActions.ACTIVE_TODOS:
            return {
                ...state,
                todoActiveList: state.todoList.filter(x => !x.completed)
            }
        case todoActions.COMPLETED_TODOS:
            return {
                ...state,
                todoCompletedList: state.todoList.filter(x => x.completed)
            }
        default:
            return state;
    }
};
