import React, { Component } from 'react';
import { connect } from 'react-redux';
import *as usersActions from '../../actions/usersActions';
import Spinner from '../General/Spinner';
import Error from '../General/Error';
import Tabla from './Tabla';

class Users extends Component {

  componentDidMount(){
    if(!this.props.users.lenght){
        this.props.traerTodos();
        }
    }

  ponerContenido = () => {
      if(this.props.loading){
          console.log('loading');
          return <Spinner />
      }

      if(this.props.error){
            return <Error message={this.props.error} />
        }


        return (
            <div className="margen">
                <Tabla />
          </div>
        )
    }



render() {
  return (
    <>
    <h1 className='center'>Users</h1>
        {this.ponerContenido()}
    </>
  )
}
}

const mapStateToProps = (reducers) => {
    return reducers.usersReducer;
}

export default connect(mapStateToProps, usersActions)(Users);