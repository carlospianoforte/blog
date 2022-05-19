import {ACTUALIZAR, 
    LOADING, ERROR, 
    COM_ERROR, 
    COM_LOADING, 
    COM_ACTUALIZAR} from '../types/publicacionesTypes';

const INITIAL_STATE = {
    publicaciones: [],
    loading: false,
    error: '',
    com_loading: false,
    com_error: '',
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

                case COM_ACTUALIZAR:
                    return {
                        ...state,
                        publicaciones: action.payload,
                        com_loading: false,
                        com_error: '',
                    };

                case COM_LOADING:
                    return {...state, com_loading: true}
        
                case COM_ERROR:
                    return {...state, 
                        com_error: action.payload,
                        com_loading: false
                    }

        default: return state;
    };
};