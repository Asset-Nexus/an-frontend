import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { apiRegister } from '../../services/register';

const Title = styled.h2`
    color: #FF8A5F;
    font-family: MuseoModerno;
    font-size: 32px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: -0.40799999237060547px;
    text-align: center;
`
const RegisterButton = styled(Button)`
    color: #FFF3BF;
    height: auto;
    font-family: MuseoModerno;
    font-size: 24px;
    font-weight: 900;
    line-height: 40px;
    letter-spacing: -0.40799999237060547px;
    text-align: center;
    border-radius: 0.8em;

`
const RegistrationPage =  () => {
    const onFinish = async (values) => {
       apiRegister(values)
    };

    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 },
        },
      };

    return (
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
            <Title>Connecting with Leading NFT Platform</Title>
            <Form onFinish={onFinish} {...formItemLayout}>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Wallet Address"
                    name="wallet_address"
                    rules={[{ required: true, message: 'Please enter your address' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <RegisterButton type="primary" htmlType="submit">
                        Register
                    </RegisterButton>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegistrationPage;