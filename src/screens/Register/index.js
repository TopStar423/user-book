import React, { useState, useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import {
    Card,
    Input,
    Button,
    Alert
} from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Context } from '../../Store';
import Error from '../../components/Error';
import { register } from '../../services/auth';
import { cardStyle, buttonStyle } from '../../constants/style';
import './style.scss';

const Register = () => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [bio, setBio] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isPasswordShort, setIsPasswordShort] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [state, dispatch] = useContext(Context);
    const history = useHistory();

    const handleFieldChange = (type, value) => {
        if (type === 'firstName') {
            setFirstName(value);
        } else if (type === 'lastName') {
            setLastName(value);
        } else if (type === 'email') {
            setEmail(value);
        } else if (type === 'password') {
            setPassword(value);
            setIsPasswordShort(value.length < 6);
            setIsPasswordMatch(value === confirmPassword);
        } else if (type === 'confirmPassword') {
            setConfirmPassword(value);
            setIsPasswordMatch(value === password);
        } else if (type === 'phoneNumber') {
            setPhoneNumber(value);
        } else if (type === 'bio') {
            setBio(value);
        }
    }

    const handleSubmit = async () => {
        setIsSubmitted(true);

        const isFieldEmpty = !firstName || !lastName || !email || !password || !phoneNumber || !bio;
        const isError = isFieldEmpty || isPasswordShort || !isPasswordMatch;

        if (!isError) {
            try {
                const user = {
                    firstName,
                    lastName,
                    email: email.toLowerCase(),
                    password,
                    phoneNumber,
                    bio
                };

                const newUser = await register(user);
                dispatch({ type: 'REGISTER_SUCCESS', payload: newUser });
                history.push('/users');
            } catch (err) {
                const errMsg = err.response.data.message;
                dispatch({ type: 'REGISTER_FAILED', error: errMsg })
            }
        }
    }

    return (
        <div className="auth-screen">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 ml-auto mr-auto high-priority">
                        <Card
                            title="Register"
                            bordered={false}
                            headStyle={cardStyle.headStyle}
                            style={cardStyle.mainStyle}
                        >
                            <div className="auth-item">
                                <div className="name-container">
                                    <div className="first-name">
                                        <label className="auth-label">
                                            First Name<sup>*</sup>
                                        </label>
                                        <Input
                                            placeholder="First Name"
                                            type="text"
                                            className="auth-input"
                                            value={firstName}
                                            onChange={e => handleFieldChange('firstName', e.target.value)}
                                        />
                                        {isSubmitted && !firstName && (
                                            <Error message="Please input your first name" />
                                        )}
                                    </div>
                                    <div className="last-name">
                                        <label className="auth-label">
                                            Last Name<sup>*</sup>
                                        </label>
                                        <Input
                                            placeholder="Last Name"
                                            type="text"
                                            className="auth-input"
                                            value={lastName}
                                            onChange={e => handleFieldChange('lastName', e.target.value)}
                                        />
                                        {isSubmitted && !lastName && (
                                            <Error message="Please input your last name" />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="auth-item">
                                <label className="auth-label">
                                    Email<sup>*</sup>
                                </label>
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    className="auth-input"
                                    value={email}
                                    onChange={e => handleFieldChange('email', e.target.value)}
                                />
                                {isSubmitted && !email && (
                                    <Error message="Please input your email" />
                                )}
                            </div>
                            <div className="auth-item">
                                <label className="auth-label">
                                    Password<sup>*</sup>
                                </label>
                                <Input
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    className="auth-input"
                                    suffix={showPassword ?
                                        <EyeInvisibleOutlined className="toggle-password" onClick={() => {setShowPassword(false)}} />
                                        :
                                        <EyeOutlined className="toggle-password" onClick={() => {setShowPassword(true)}} />}
                                    value={password}
                                    onChange={e => handleFieldChange('password', e.target.value)}
                                />
                                {isSubmitted && !password && (
                                    <Error message="Please input your password" />
                                )}
                                {isSubmitted && password && isPasswordShort && (
                                    <Error message="Password should be 6 letters at least" />
                                )}
                            </div>
                            <div className="auth-item">
                                <label className="auth-label">
                                    Confirm Password<sup>*</sup>
                                </label>
                                <Input
                                    placeholder="Confirm Password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="auth-input"
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
                            <div className="auth-item">
                                <label className="auth-label">
                                    Phone Number<sup>*</sup>
                                </label>
                                <Input
                                    placeholder="Phone number"
                                    type="text"
                                    className="auth-input"
                                    value={phoneNumber}
                                    onChange={e => handleFieldChange('phoneNumber', e.target.value)}
                                />
                                {isSubmitted && !phoneNumber && (
                                    <Error message="Please input your phone number" />
                                )}
                            </div>
                            <div className="auth-item">
                                <label className="auth-label">
                                    Bio<sup>*</sup>
                                </label>
                                <Input.TextArea
                                    placeholder="Please describe yourself"
                                    className="auth-input textarea"
                                    value={bio}
                                    onChange={e => handleFieldChange('bio', e.target.value)}
                                />
                                {isSubmitted && !bio && (
                                    <Error message="Please input your bio" />
                                )}
                            </div>
                            {state.error && (
                                <Alert
                                    message={state.error}
                                    type="error"
                                    showIcon
                                    closable
                                />
                            )}
                            <div className="auth-item">
                                <Button
                                    type="primary"
                                    className="auth-form-button"
                                    onClick={handleSubmit}
                                    style={buttonStyle}
                                >
                                    Register
                                </Button>
                            </div>
                            <div className="go-to-register">
                                <span className="not-have-a-account">Already have an account? </span>
                                <Link to="/login">Login</Link>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;