import React from 'react';

function UserList({ users, onSelectUser, onDeleteUser }) {
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2>Lista de Usuários</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Foto</th>
                                <th>Nome</th>
                                <th>Idade</th>
                                <th>Rua</th>
                                <th>Bairro</th>
                                <th>Estado</th>
                                <th>Biografia</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <img src={`http://localhost:3000/uploads/${user.profile_image}`} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.street}</td>
                                    <td>{user.neighborhood}</td>
                                    <td>{user.state}</td>
                                    <td>{user.biography}</td>
                                    <td>
                                        <button className="btn btn-info mr-2" onClick={() => onSelectUser(user)}>Editar</button>
                                        <button className="btn btn-danger" onClick={() => onDeleteUser(user.id)}>Deletar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


export default UserList;
