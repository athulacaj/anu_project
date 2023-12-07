// create a simple login page and export it
import React, { useContext, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import './login.css';
import useLoginController from './login_controller';

const Login = () => {
    const t = i18next.t;


    // useEffect(() => {
    //     console.log('value', t('label_login'));
    //     // i18next.changeLanguage('ml');
    //     console.log('value', t('label_login'));
    // }, []);


    const { email, setEmail, password, setPassword, signInWithEmailPassword, loginError } = useLoginController();

    return (
        <div className='login_container_parent'>
            <div className="login_container">
                <Form
                    name="normal_login"
                    className="login-form"

                    initialValues={{
                        remember: true,
                    }}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input
                            onChange={(e) => {
                                console.log('email', e.target.value);
                                setEmail(e.target.value);
                            }}
                            value={email}
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                            autoComplete="off"
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                whitespace: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            autoComplete="off"
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox className="login-form-remember">{t('label_rember_me')}</Checkbox>
                        </Form.Item>
                        <a className="login-form-forgot" href="/login">
                            {
                                t('label_forgot_password')
                            }
                        </a>
                    </Form.Item>

                    <Form.Item>
                        {
                            loginError && <div className="login-form-error">
                                {loginError}
                            </div>
                        }
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            onClick={signInWithEmailPassword}
                        >
                            {
                                t('label_login')
                            }
                        </Button>
                    </Form.Item>

                    {/* <Form.Item>
                       
                        Or <a href="/register">{t('label_register')}!</a>
                    </Form.Item> */}
                </Form>

            </div>
        </div>
    );
};


export default Login;
