import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Tabla = (props) => {
    const ponerFilas = () => props.users.map((user, key) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
        <td>{
            <Link to={`/publicaciones/${key}`}>
            <div className="eye-solid icon"></div>
            </Link>
            }</td>
      </tr>
    ));

  return (
    <div>
        <table className='tabla'>
            <thead>
            <tr>
                <th>Name</th>
                <th>email</th>
                <th>link</th>
            </tr>
            </thead>
            <tbody>
            { ponerFilas() }
            </tbody>
        </table>
    </div>
  )
}

const mapStateToProps = (reducers) => {
    return reducers.usersReducer;
}

export default connect(mapStateToProps)(Tabla);