import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
    Form,
    Card,
    Input,
    Button,
    Alert
} from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Context } from '../../Store';
import Error from '../../components/Error';
import { login } from '../../services/auth';
import { cardStyle, buttonStyle } from '../../constants/style';
import './style.scss';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [state, dispatch] = useContext(Context);
    const history = useHistory();

    const handleFieldChange = (type, value) => {
        if (type === 'email') {
            setEmail(value);
        } else if (type === 'password') {
            setPassword(value);
        }
    }

    const handleSubmit = async () => {
        setIsSubmitted(true);

        const isError = !email || !password;

        if (!isError) {
            try {
                const user = await login(email, password);
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: user
                });
                history.push('/users');
            } catch (err) {
                const errMsg = err.response.data.message;
                dispatch({
                    type: 'LOGIN_FAILED',
                    error: errMsg
                });
            }
        }
    }

    return (
        <div className="auth-screen">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 ml-auto mr-auto high-priority">
                        <Card
                            title="Log in"
                            bordered={false}
                            headStyle={cardStyle.headStyle}
                            style={cardStyle.mainStyle}
                        >
                            <Form onFinish={handleSubmit}>
                                <Form.Item>
                                    <label className="auth-label">Email</label>
                                    <Input
                                        placeholder="Email..."
                                        type="email"
                                        className="auth-input"
                                        onChange={e => handleFieldChange('email', e.target.value)}
                                    />
                                    {isSubmitted && !email && (
                                        <Error message="Please input your email" />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <label className="auth-label">Password</label>
                                    <Input
                                        placeholder="Password..."
                                        type={showPassword ? "text" : "password"}
                                        className="auth-input"
                                        suffix={showPassword ?
                                            <EyeInvisibleOutlined className="toggle-password" onClick={() => {setShowPassword(false)}} />
                                            :
                                            <EyeOutlined className="toggle-password" onClick={() => {setShowPassword(true)}} />}
                                        onChange={e => handleFieldChange('password', e.target.value)}
                                    />
                                    {isSubmitted && !password && (
                                        <Error message="Please input your password" />
                                    )}
                                </Form.Item>
                                {state.error && (
                                    <Alert
                                        message={state.error}
                                        type="error"
                                        showIcon
                                        closable
                                    />
                                )}
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="auth-form-button"
                                        style={buttonStyle}
                                    >
                                        Login
                                    </Button>
                                </Form.Item>
                            </Form>
                            <div className="go-to-register">
                                <span className="not-have-a-account">Don't have an account? </span>
                                <Link to="/register">Register Now!</Link>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;