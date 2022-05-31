import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../General/Spinner';
import Error from '../General/Error';
import '../../css/tareas.css'
import * as tareasActions from '../../actions/tareasActions'

const Tareas = (props) => {

    useEffect(() => {
        if(!Object.keys(props.tareas).length){
            props.traerTodas();
        }
    },[props]);

    useEffect(() => {
        const{tareas, loading, traerTodas} = props
        if(!Object.keys(tareas).length && !loading){
            traerTodas();
        }
    },[props]);
    

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
        const {tareas, cambioCheck, eliminar} = props;
        const por_usuario = {
            ...tareas[usu_id]
        }
        return Object.keys(por_usuario).map((tar_id)=>(
            <div key={tar_id} className = 'tareas_container' >
                <div>

                <input 
                    type='checkbox' 
                    defaultChecked = {por_usuario[tar_id].completed}
                    onChange = {() => cambioCheck(usu_id, tar_id)} 
                />
                {por_usuario[tar_id].title}
                </div>
                
                <div className='tareas_buttons'>
                    <button className='btn btn-primary' >
                        <Link to={`/tareas/guardar/${usu_id}/${tar_id}`}>Editar</Link>
                    </button>
                    <button className='btn btn-danger' onClick={()=> eliminar(tar_id)} >
                        Eliminar
                    </button> 
                </div>
            </div>
        ))
    }

    console.log(props.tareas);

  return (
    <div>
        <div className='tareas_agregar'>
            <button className='tareas_agregar_button'>
                <Link to='/tareas/guardar'>
                    Agregar
                </Link>
            </button>
        </div>
        {mostrarContenido()}
    </div>
  )
}

const mapStateToProps = ({tareasReducer}) => tareasReducer

export default connect(mapStateToProps, tareasActions)(Tareas);