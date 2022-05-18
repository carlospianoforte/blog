import React, { useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import *as usersActions from '../../actions/usersActions';
import *as publicacionesActions from '../../actions/publicacionesActions';
import Spinner from '../General/Spinner';
import Error from '../General/Error';

const {traerTodos: usuariosTraerTodos} = usersActions;
const {traerPorUsuario: publicacionesTraerPorUsuario, abrirCerrar} = publicacionesActions;



const Publicaciones = (props) => {
    const params = useParams();
   
         useEffect(() => {

            if(!props.usersReducer.users.length){
                props.usuariosTraerTodos();
            }
            if(props.usersReducer.error){return}

            if(!('publicaciones_key' in props.usersReducer.users[params.key])){
                props.publicacionesTraerPorUsuario(params.key);
            }
        },[]);    

    const ponerUsuario = () => {

        if(!props.usersReducer.users.length || props.usersReducer.loading){
            return <Spinner />
        }
        if(props.usersReducer.error){
            return <Error message={props.usersReducer.error} />
        }
        const nombre = props.usersReducer.users[params.key].name;
        return(
            <h1>Publicaciones de {nombre}</h1>
        )
    }

    const ponerPublicaciones = () => {
        const {
            usersReducer,
            usersReducer: { users },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
        } = props;

        if(!users.length) return;
        if(usersReducer.error) return;
        if(publicacionesReducer.loading) return <Spinner />;
        if(publicacionesReducer.error) return <Error message={publicacionesReducer.error} />;
        if(!publicaciones.length) return;
        if(!('publicaciones_key' in users[params.key])) return;

        const {publicaciones_key} = users[params.key];

        return mostrarInfo(
            publicaciones[publicaciones_key],
            publicaciones_key,
        );
      };

     const mostrarInfo = (publicaciones, pub_key) => (
        publicaciones.map((publicacion, com_key) => (
            <div className='pub_titulo' 
            key={publicacion.id}
            onClick={() => props.abrirCerrar(pub_key, com_key)}
            >
                <h4>{publicacion.title}</h4>
                <p>{publicacion.body}</p>
                {(publicacion.abierto)? 'abierto' : 'cerrado'};
                {console.log(publicacion.abierto)}
            </div>
        
    ))
    );


    return (

        <div>
            
            {params.key}
             {ponerUsuario()}
             {ponerPublicaciones()}

        </div>
    )

    

/*     const params = useParams();
    console.log(props);
    return (
        <div>
            <h1>Publicaciones de {props.postId}</h1>
            <h2>{params.key}</h2>
        </div>
    ) */
}

const mapStateToProps = ({usersReducer, publicacionesReducer}) => {
    return {usersReducer, publicacionesReducer};
}

const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerPorUsuario,
    abrirCerrar,
}


export default connect (mapStateToProps, mapDispatchToProps)(Publicaciones);
