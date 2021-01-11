import React, { useState, useEffect, useContext } from 'react';
import { EditOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Context } from '../../Store';
import UserModal from './UserModal';
import {deleteUser, getUsers} from '../../services/users';
import './style.scss';

const Users = () => {
    const [mode, setMode] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const [state, dispatch] = useContext(Context);
    const { users } = state;

    useEffect(() => {
        try {
            async function fetchUsers() {
                const users = await getUsers();
                dispatch({ type: 'GET_USERS_SUCCESS', payload: users });
            }

            fetchUsers();
        } catch (err) {
            const errMsg = err.response.data.message;
            dispatch({ type: 'GET_USERS_FAILED', error: errMsg });
        }
    }, [])

    const handleAddUser = () => {
        setMode('add');
        setSelectedUser(null);
    }

    const handleEditUser = user => {
        setMode('edit');
        setSelectedUser(user);
    }

    const handleDeleteUser = async user => {
        try {
            const deletedUser = await deleteUser(user);
            dispatch({ type: 'DELETE_USER_SUCCESS', payload: deletedUser });
        } catch (err) {
            const errMsg = err.response.data.message;
            dispatch({ type: 'DELETE_USER_FAILED', error: errMsg });
        }
    }

    const handleCloseModal = () => {
        setMode('');
        setSelectedUser(null);
    }

    const onAddNewUser = user => {
        dispatch({ type: 'ADD_NEW_USER', payload: user });
        handleCloseModal();
    }

    const onUpdateUserList = user => {
        dispatch({ type: 'UPDATE_USER_LIST', payload: user });
        handleCloseModal();
    }

    return (
        <div className="users-screen">
            <div className="container">
                <div className="page-title">User Management</div>
                <div className="subtitle">
                    <span className="user-list-subtitle">
                        User List
                    </span>
                    <div className="add-user">
                        <span className="add-text">Add User</span>
                        <PlusCircleOutlined className="add-icon" onClick={() => handleAddUser()} />
                    </div>
                </div>
                <div className="user-list-header user-row">
                    <div className="user-name">Full name</div>
                    <div className="user-email">Email</div>
                    <div className="phone-number">Phone number</div>
                    <div className="bio">Bio</div>
                    <div className="edit" />
                    <div className="delete" />
                </div>
                <div className="user-list-content">
                    {users && users.map((user, idx) => (
                        <div className="user-row" key={idx}>
                            <div className="user-name">{user.firstName}{' '}{user.lastName}</div>
                            <div className="user-email">{user.email}</div>
                            <div className="phone-number">{user.phoneNumber}</div>
                            <div className="bio">{user.bio}</div>
                            <div className="edit">
                                <EditOutlined className="edit-icon" onClick={() => handleEditUser(user)} />
                            </div>
                            <div className="delete">
                                <DeleteOutlined className="delete-icon" onClick={() => handleDeleteUser(user)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {mode && (
                <UserModal
                    mode={mode}
                    user={selectedUser}
                    onCloseModal={handleCloseModal}
                    onAddNewUser={onAddNewUser}
                    onUpdateUserList={onUpdateUserList}
                />
            )}
        </div>
    )
}

export default Users;