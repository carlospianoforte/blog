import axios from "axios";
import { GET_WORKS, LOADING, ERROR} from "../types/tareasTypes";

export const traerTodas = () => async (dispatch) => {
    dispatch({
        type: LOADING,
    });

    try{
        const respuesta = await axios.get("https://jsonplaceholder.typicode.com/todos");
        const tareas = {};
        respuesta.data.map((tar)=>(
            tareas[tar.userId] = {
                ...tareas[tar.userId],
                [tar.id]: {
                    ...tar
                }
            }
        ))


        dispatch({
            type: GET_WORKS,
            payload: tareas
        });
    }
    catch (error){
        dispatch({
            type: ERROR,
            payload: 'Something went wrong, information works not available.'
        });
    }
}
