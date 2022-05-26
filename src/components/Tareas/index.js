import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Error from '../General/Error';
import * as tareasActions from '../../actions/tareasActions'

const Tareas = (props) => {

    useEffect(() => {
        props.traerTodas();
    },[]);  

    const mostrarContenido = () => {
        const {tareas, loading, error} = props;
        if(loading){
            return <Spinner />
        }
        if(error){
            return <Error message={error} />
        }

        return Object.keys(tareas).map((usu_id)=>(
            <div key={usu_id} >
                <h2>usuario {usu_id}</h2>
                <div className="contenedor_tareas">
                    {ponerTareas(usu_id)}
                </div>
            </div>
        ))
    }

    const ponerTareas = (usu_id) => {
        const {tareas} = props;
        const por_usuario = {
            ...tareas[usu_id]
        }
        return Object.keys(por_usuario).map((tar_id)=>(
            <div key={tar_id} >
                <input type='checkbox' defaultChecked = {por_usuario[tar_id].completed} />
                {por_usuario[tar_id].title}
            </div>
        ))
    }


  return (
    <div>
        {mostrarContenido()}
    </div>
  )
}

const mapStateToProps = ({tareasReducer}) => tareasReducer

export default connect(mapStateToProps, tareasActions)(Tareas);