import axios from "axios";
import { GET_USERS, LOADING, ERROR} from "../types/usersTypes";

export const traerTodos = () => async (dispatch) => {
    dispatch({
        type: LOADING,
    });

    try{
        const respuesta = await axios.get("https://jsonplaceholder.typicode.com/users");
        dispatch({
            type: GET_USERS,
            payload: respuesta.data
        });
    }
    catch (error){
        dispatch({
            type: ERROR,
            payload: 'Something went wrong, try again later.'
        });
    }
}
