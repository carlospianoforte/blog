import axios from "axios";
import {ACTUALIZAR, 
    LOADING, ERROR, 
    COM_ERROR, 
    COM_LOADING, 
    COM_ACTUALIZAR} from '../types/publicacionesTypes';import *as usersTypes from '../types/usersTypes';

const { GET_USERS: USER_GET_USERS } = usersTypes;


export const traerPorUsuario = (key) => async (dispatch, getState) => {
    dispatch({
        type: LOADING,
    });

    const {users} = getState().usersReducer;
    const {publicaciones} = getState().publicacionesReducer;
    const user_id = users[key].id;

    try{
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`);
        
        const nuevas = respuesta.data.map(
            (publicacion) => ({
                ...publicacion,
                comentarios: [],
                abierto: false,
        }))

        const publicaciones_actualizadas = [
            ...publicaciones,
            nuevas,
        ];
    
        dispatch({
            type: ACTUALIZAR,
            payload: publicaciones_actualizadas
        });
    
        const publicaciones_key = publicaciones_actualizadas.length - 1;
        const usuarios_actualizados = [...users];
        usuarios_actualizados[key] = {
            ...users[key],
            publicaciones_key
        };
    
        dispatch({
            type: USER_GET_USERS,
            payload: usuarios_actualizados
        });
    }catch(error){
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Something went wrong, try again later.'
        });
    }
}

export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
    const {publicaciones} = getState().publicacionesReducer;
    const seleccionada = publicaciones[pub_key][com_key]

    const actualizada = {
        ...seleccionada,
        abierto: !seleccionada.abierto
    };
    const publicaciones_actualizadas = [...publicaciones]
    publicaciones_actualizadas[pub_key]= [
        ...publicaciones[pub_key]
    ];
    publicaciones_actualizadas[pub_key][com_key] = actualizada;

    dispatch({
        type: ACTUALIZAR,
        payload: publicaciones_actualizadas
    });

}

export const traerComentarios = (pub_key, com_key) => async (dispatch, getState) => {
    dispatch({
        type: COM_LOADING
    })
    const {publicaciones} = getState().publicacionesReducer;
    const seleccionada = publicaciones[pub_key][com_key];

    try{
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`);

        const actualizada = {
            ...seleccionada,
            comentarios: respuesta.data
        };
    
        const publicaciones_actualizadas = [...publicaciones]
        publicaciones_actualizadas[pub_key]= [
            ...publicaciones[pub_key]
        ];
        publicaciones_actualizadas[pub_key][com_key] = actualizada;
    
        dispatch({
            type: COM_ACTUALIZAR,
            payload: publicaciones_actualizadas
        });
    }catch(error){
        console.log(error.message)
        dispatch({
            type: COM_ERROR,
            payload: 'Comments Not Available'
        })
    }
}




