import { Button, Divider, Form, Input, message, notification } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import './Register.scss';
import { registerNewUser } from '../../services/userService'
import { toast } from 'react-toastify';


const Register = () => {
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    })

    const onFinish = async (values) => {
        const res = await registerNewUser(userInfo)
        if (res.EC === 2) {
            toast.error("Email or phone exist")
        }
        else if (res.EC === 1) {
            toast.success("Create account success")
        }
    };
    const onChangeInput = async (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }
    return (
        <div className="register-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Đăng Ký Tài Khoản</h2>
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
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Họ tên không được để trống!' }]}

                            >
                                <Input name="username" onChange={(e) => onChangeInput(e)} />

                            </Form.Item>


                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Email không được để trống!' }]}
                                values={userInfo.email}
                            >
                                <Input name="email" onChange={(e) => onChangeInput(e)} />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                                values={userInfo.password}
                            >
                                <Input.Password name="password" onChange={(e) => onChangeInput(e)} />
                            </Form.Item>
                            <Form.Item
                                labelCol={{ span: 24 }} //whole column
                                label="Số điện thoại"
                                name="phone"
                                rules={[{ required: true, message: 'Số điện thoại không được để trống!' }]}
                                values={userInfo.phone}
                            >
                                <Input name="phone" onChange={(e) => onChangeInput(e)} />
                            </Form.Item>

                            <Form.Item
                            // wrapperCol={{ offset: 6, span: 16 }}
                            >
                                <Button type="primary" htmlType="submit" loading={false}>
                                    Đăng ký
                                </Button>
                            </Form.Item>
                            <Divider>Or</Divider>
                            <p className="text text-normal">Đã có tài khoản ?
                                <span>
                                    <Link to='/login' > Đăng Nhập </Link>
                                </span>
                            </p>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    )

}
export default Register