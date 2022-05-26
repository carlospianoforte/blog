import { GET_WORKS, LOADING, ERROR } from "../types/tareasTypes";


const INITIAL_STATE = {
    tareas: {},
    loading: false,
    error: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case GET_WORKS:
            return {
                ...state, 
                tareas: action.payload,
                loading: false,
                error: '',
            };

        case LOADING:
            return {...state, loading: true}

        case ERROR:
            return {...state, 
                error: action.payload,
                loading: false
            }

        default: return state;
    };
};