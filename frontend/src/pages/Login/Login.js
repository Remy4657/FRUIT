import React from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './Login.scss'
import { loginUser } from '../../services/userService';
import { toast } from 'react-toastify';
import { USER_LOGIN } from '../../redux/actions/action';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.user)
    const onFinish = async (values) => {
        userState.isLoading = true

        const res = await loginUser(values)
        if (res.EC === 1) {
            //localStorage.setItem("access_token", res.DT.access_token)
            toast.success(res.EM)
            dispatch(USER_LOGIN(res.DT.payload.userRole))
            navigate("/")
        }
        else if (res.EC === 2) {
            toast.error(res.EM)
        }
    };
    // đảm bảo state đã thay đổi mới thực hiện ( khi refresh thì app.js đang update state)
    useEffect(() => {
        if (userState.auth === true) {
            navigate("/");
            // window.location.reload();
        }
    }, [userState]);
    return (
        <div className="login-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Đăng Nhập</h2>
                            <Divider />

                        </div>
                        <Form
                            name="basic"
                            // style={{ maxWidth: 600, margin: '0 auto' }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Email không được để trống!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                            // wrapperCol={{ offset: 6, span: 16 }}
                            >
                                <Button type="primary" htmlType="submit" loading={false}>
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                            <Divider>Or</Divider>
                            <p className="text text-normal">Chưa có tài khoản ?
                                <span>
                                    <Link to='/register' > Đăng Ký </Link>
                                </span>
                            </p>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    )

};

export default Login;
