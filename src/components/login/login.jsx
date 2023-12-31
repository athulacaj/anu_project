// create a simple login page and export it
import React, { useContext, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import './login.css';

const Login = () => {
    const t = i18next.t;


    useEffect(() => {
        console.log('value',t('label_login'));
        i18next.changeLanguage('ml');
        console.log('value',t('label_login'));
    }, []);

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    
    return (
        <div className='login_container_parent'>
        <div className="login_container">
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
            remember: true,
            username: 'admin',
            password: 'admin',
            }}
            onFinish={onFinish}
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
            <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                href="/home"
            >
                {
                    t('label_login')
                }
            </Button>
            Or <a href="/register">{t('label_register')}!</a>
            </Form.Item>
        </Form>
        </div>
        </div>
    );
    };


export default Login;
