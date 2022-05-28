import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import Spinner from '../General/Spinner'
import Error from '../General/Error'
import { useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import * as tareasActions from '../../actions/tareasActions'

const Guardar = (props) => {
    const params = useParams();
   
    useEffect(() => {
        const {
            tareas,
            cambioUsuarioId,
            cambioTitulo,
        } = props

        if(params.usu_id && params.tar_id){
            const tarea = tareas[params.usu_id][params.tar_id]
            cambioUsuarioId(tarea.userId)
            cambioTitulo(tarea.title)
        }
   },[]); 

    const cambioUsuarioId = (e) => {
        props.cambioUsuarioId(e.target.value)

    }

    const cambioTitulo = (e) => {
        props.cambioTitulo(e.target.value)

    }

    const guardar = () => {
        const {
                tareas,
                usuario_id, 
                titulo, 
                agregar,
                editar,
            } = props

        const nueva_tarea = {
            userId: usuario_id,
            title: titulo,
            completed: false,
        };
        if(params.usu_id && params.tar_id){
            const tarea = tareas[params.usu_id][params.tar_id];
            const tarea_editada = {
                ...nueva_tarea,
                completed: tarea.completed,
                id: tarea.id,
            };
            editar(tarea_editada);
        }else{
            agregar(nueva_tarea)

        }
    }

    const deshabilitar = () => {
        const {usuario_id, titulo, loading}=props
        if(loading){
            return true;
        }
        if(!usuario_id || !titulo){
            return true
        }
        return false;
    }

    const mostrarAction = () => {
        const {error, loading}=props
        if(loading){
            return <Spinner/>
        }
        if(error){
            return <Error message={error} />
        }
    }

    const navigate = useNavigate();

  return (
    <div>
        
            {(props.regresar) ? navigate('/tareas')  : ''}
        
        <h1>
            Guardar tarea
        </h1>
        Usuario id:
        <input 
            type="number"
             value={props.usuario_id}
             onChange = {cambioUsuarioId} 
            />
        <br /><br />
        Titulo:
        <input 
            type="text"
             value={props.titulo}
             onChange = {cambioTitulo} 
         />
        <br /><br />
        <button
            onClick={guardar}
            disabled={deshabilitar()}
        >Guardar</button>
        {mostrarAction()}
    </div>
  )
}

const mapStateToProps = ({tareasReducer}) => tareasReducer


export default connect (mapStateToProps, tareasActions)(Guardar);
