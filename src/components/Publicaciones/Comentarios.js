import React from 'react'
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Error from '../General/Error';
import '../../css/comentarios.css'

const Comentarios = (props) => {
    if(props.com_error){
        return <Error mensaje={props.com_error} />
    }

    if(props.com_loading && !props.comentarios.length){
        return <Spinner/>
    }
    
    const ponerComentarios = () => (
        props.comentarios.map((comentario)=>(
            <div className='comentarios_container'>

            <li>
                <b>
                    <u>
                        {comentario.email}
                    </u>
                </b>
                <br />
                {comentario.body}
            </li>
            </div>
        ))
    );

  return (
    <ul>
        { ponerComentarios() }
    </ul>
  )
}

const mapStateToProps = ({publicacionesReducer}) => publicacionesReducer;


export default connect(mapStateToProps)(Comentarios)