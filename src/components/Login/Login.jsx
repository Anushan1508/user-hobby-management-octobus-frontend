// frontend/src/components/Login.jsx
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {login} from '../../service/api';
import './Login.css';
import '../../App.css'
import {Button, Form, Input} from "antd";
import Cookies from 'js-cookie'; // Import js-cookie


const Login = ({setAuthenticated}) => {
    const navigate = useNavigate();
    const [loginForm] = Form.useForm();
    const handleLogin = () => {
        loginForm.validateFields().then(async (value) => {
            const response = await login(loginForm.getFieldsValue());
            console.log(response.status);
            if (response.status === "success") {
                Cookies.set('authenticated', 'true', { expires: 10000 }); // Set expiration as needed
                setAuthenticated(true);
                navigate('/');
            }
        }).catch(() => {

        });
    };

    return (
        <div className={"container"}>
            <h1>Login</h1>
            <Form
                labelCol={{span: 12}}
                className="mt-5"
                layout="vertical"
                form={loginForm}
                scrollToFirstError
                autoComplete="off"
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            message: 'Email cannot be empty.',
                            required: true,
                        },
                        {
                            type: 'email',
                            message: 'Please enter a valid email.',
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            message: 'Password cannot be empty.',
                            required: true,
                        },
                        {
                            min: 4,
                            message: 'Password must be at least 4 characters long.',
                        }

                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form>
            <form>
                <Button className="ant-btn-default" onClick={()=>handleLogin()}>
                    Login
                </Button>
            </form>
        </div>
    );
};

export default Login;
