import {ACTUALIZAR, LOADING, ERROR} from '../types/publicacionesTypes';

const INITIAL_STATE = {
    publicaciones: [],
    loading: false,
    error: '',
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case ACTUALIZAR:
            return {
                ...state,
                publicaciones: action.payload,
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