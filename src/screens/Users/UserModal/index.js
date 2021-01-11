import React, { useState } from 'react';
import { Input, Button, Alert } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import Error from '../../../components/Error';
import { createUser, updateUser } from '../../../services/users';
import './styles.scss';

const UserModal = ({ mode, user, onCloseModal, onAddNewUser, onUpdateUserList }) => {
    const [firstName, setFirstName] = useState(mode === 'edit' ? user.firstName : '');
    const [lastName, setLastName] = useState(mode === 'edit' ? user.lastName : '');
    const [email, setEmail] = useState(mode === 'edit' ? user.email : '');
    const [phoneNumber, setPhoneNumber] = useState(mode === 'edit' ? user.phoneNumber : '');
    const [bio, setBio] = useState(mode === 'edit' ? user.bio : '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isPasswordShort, setIsPasswordShort] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [optErr, setOptErr] = useState('');

    const handleFieldChange = (type, value) => {
        switch (type) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phoneNumber':
                setPhoneNumber(value);
                break;
            case 'bio':
                setBio(value);
                break;
            case 'password':
                setPassword(value);
                setIsPasswordShort(value.length < 6);
                setIsPasswordMatch(value === confirmPassword);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                setIsPasswordMatch(value === password);
                break;
            default:
                break;
        }
    }

    const handleCancelEdit = () => {
        onCloseModal();
    }

    const handleSaveUser = async () => {
        setIsSubmitted(true);

        const isFieldEmpty = !firstName || !lastName || !email || !password || !phoneNumber || !bio;
        const isError = isFieldEmpty || isPasswordShort || !isPasswordMatch;

        if (!isError) {
            if (mode === 'add') {
                const userData = {
                    firstName,
                    lastName,
                    email: email.toLowerCase(),
                    phoneNumber,
                    bio,
                    password
                }

                try {
                    const newUser = await createUser(userData);
                    onAddNewUser(newUser);
                } catch (err) {
                    const errMsg = err.response.data.message;
                    setOptErr(errMsg);
                }
            } else {
                const userData = {
                    ...user,
                    firstName,
                    lastName,
                    email: email.toLowerCase(),
                    phoneNumber,
                    bio,
                    password
                }

                try {
                    const updatedUser = await updateUser(userData);
                    onUpdateUserList(userData);
                } catch (err) {
                    const errMsg = err.response.data.message;
                    setOptErr(errMsg);
                }
            }

        }
    }

    return (
        <div className="user-modal">
            <div className="modal-title">
                {mode === 'add' ? 'Add new user' : 'Edit user'}
            </div>
            <div className="user-name">
                <div className="first-name">
                    <label className="user-field-label">First name</label>
                    <Input
                        type="text"
                        placeholder="First name"
                        className="user-field-input"
                        disabled={mode === 'edit'}
                        value={firstName}
                        onChange={e => handleFieldChange('firstName', e.target.value)}
                    />
                    {isSubmitted && !firstName && (
                        <Error message="Please input first name" />
                    )}
                </div>
                <div className="last-name">
                    <label className="user-field-label">Last name</label>
                    <Input
                        type="text"
                        placeholder="Last name"
                        className="user-field-input"
                        disabled={mode === 'edit'}
                        value={lastName}
                        onChange={e => handleFieldChange('lastName', e.target.value)}
                    />
                    {isSubmitted && !lastName && (
                        <Error message="Please input last name" />
                    )}
                </div>
            </div>
            <div className="email-phone">
                <div className="email">
                    <label className="user-field-label">Email</label>
                    <Input
                        type="text"
                        placeholder="Email"
                        className="user-field-input"
                        value={email}
                        onChange={e => handleFieldChange('email', e.target.value)}
                    />
                    {isSubmitted && !email && (
                        <Error message="Please input email" />
                    )}
                </div>
                <div className="phone-number">
                    <label className="user-field-label">Phone number</label>
                    <Input
                        type="text"
                        placeholder="Phone number"
                        className="user-field-input"
                        value={phoneNumber}
                        onChange={e => handleFieldChange('phoneNumber', e.target.value)}
                    />
                    {isSubmitted && !phoneNumber && (
                        <Error message="Please input phone number" />
                    )}
                </div>
            </div>
            <div className="bio">
                <label className="user-field-label">Bio</label>
                <Input.TextArea
                    type="text"
                    placeholder="Bio"
                    className="user-field-input textarea"
                    value={bio}
                    onChange={e => handleFieldChange('bio', e.target.value)}
                />
                {isSubmitted && !bio && (
                    <Error message="Please input bio" />
                )}
            </div>
            <div className="password-fields">
                <div className="password">
                    <label className="user-field-label">Password</label>
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="user-field-input"
                        suffix={showPassword ?
                            <EyeInvisibleOutlined className="toggle-password" onClick={() => {setShowPassword(false)}} />
                            :
                            <EyeOutlined className="toggle-password" onClick={() => {setShowPassword(true)}} />}
                        value={password}
                        onChange={e => handleFieldChange('password', e.target.value)}
                    />
                    {isSubmitted && !password && (
                        <Error message="Please input password" />
                    )}
                    {isSubmitted && password && isPasswordShort && (
                        <Error message="Password should be 6 letters at least" />
                    )}
                </div>
                <div className="confirm-password">
                    <label className="user-field-label">Confirm Password</label>
                    <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        className="user-field-input"
                        suffix={showConfirmPassword ?
                            <EyeInvisibleOutlined className="toggle-password" onClick={() => {setShowConfirmPassword(false)}} />
                            :
                            <EyeOutlined className="toggle-password" onClick={() => {setShowConfirmPassword(true)}} />}
                        value={confirmPassword}
                        onChange={e => handleFieldChange('confirmPassword', e.target.value)}
                    />
                    {isSubmitted && !isPasswordMatch && (
                        <Error message="Passwords not match!" />
                    )}
                </div>
            </div>
            {optErr && (
                <Alert
                    message={optErr}
                    type="error"
                    showIcon
                    closable
                />
            )}
            <div className="action">
                <Button
                    className="btn-user-action btn-cancel"
                    onClick={() => handleCancelEdit()}
                >
                    Cancel
                </Button>
                <Button
                    className="btn-user-action btn-save"
                    onClick={() => handleSaveUser()}
                >
                    Save
                </Button>
            </div>
        </div>
    )
}

export default UserModal;