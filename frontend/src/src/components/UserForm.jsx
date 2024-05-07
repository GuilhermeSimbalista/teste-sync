import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../api/userService';

function UserForm({ selectedUser, refreshUsers }) {
    const [user, setUser] = useState(selectedUser || {
        name: '', age: '', street: '', neighborhood: '', state: '', biography: '', profile_image: ''
    });
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (selectedUser) {
            setUser(selectedUser);
        }
    }, [selectedUser]);

    const handleChange = (e) => {
        if (e.target.name === 'profile_image') {
            setUser({ ...user, [e.target.name]: e.target.files[0] });
            setFile(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('age', user.age);
        formData.append('street', user.street);
        formData.append('neighborhood', user.neighborhood);
        formData.append('state', user.state);
        formData.append('biography', user.biography);
        formData.append('profile_image', file);

        if (user.id) {
            await updateUser(user.id, formData);
        } else {
            await createUser(formData);
        }
        refreshUsers();
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
            <h2>{user.id ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name" value={user.name} onChange={handleChange} placeholder="Nome" required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Idade</label>
                            <input type="number" className="form-control" name="age" value={user.age} onChange={handleChange} placeholder="Idade" required />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Rua</label>
                            <input type="text" className="form-control" name="street" value={user.street} onChange={handleChange} placeholder="Rua" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Bairro</label>
                            <input type="text" className="form-control" name="neighborhood" value={user.neighborhood} onChange={handleChange} placeholder="Bairro" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Estado</label>
                            <input type="text" className="form-control" name="state" value={user.state} onChange={handleChange} placeholder="Estado" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Biografia</label>
                            <textarea className="form-control" name="biography" value={user.biography} onChange={handleChange} placeholder="Biografia" rows="3"></textarea>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Imagem de Perfil </label>
                    <input type="file" name="profile_image" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary px-md-4">{user.id ? 'Atualizar' : 'Adicionar'}</button>
            </form>
        </div>
        </div>
    </div>
    );
}

export default UserForm;
