import { GET_WORKS, 
    LOADING, 
    ERROR,
    CAMBIO_USUARIO_ID,
    CAMBIO_TITULO,
    GUARDAR,
    ACTUALIZAR,
    } from "../types/tareasTypes";


const INITIAL_STATE = {
    tareas: {},
    loading: false,
    error: '',
    usuario_id:'',
    titulo:'',
    regresar: false,
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
                regresar: false,
            };

        case LOADING:
            return {...state, loading: true}

        case ERROR:
            return {...state, 
                error: action.payload,
                loading: false
            }

        case CAMBIO_USUARIO_ID:
            return{
                ...state,
                usuario_id: action.payload,
            }

            case CAMBIO_TITULO:
                return{
                    ...state,
                    titulo: action.payload,
                }

                case GUARDAR:
                    return{
                        ...state,
                        tareas: {},
                        loading: false,
                        error: '',
                        regresar:true,
                        usuario_id: '',
                        titulo: '',
                    }

                    case ACTUALIZAR:
                        return{
                            ...state,
                            tareas: action.payload
                        }

        default: return state;
    };
};