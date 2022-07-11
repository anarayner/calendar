import React, {FC, useState} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useAuthActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";

const LoginForm: FC= () => {
    const { error} = useTypedSelector(state => state.AuthReducer)
    const {login} = useAuthActions()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const submit =()=>{
        console.log(username, password)
         login(username, password)
    }

    return (

        <Form
            onFinish={submit}
        >
            <div style={{paddingBottom: 20}}>username: user, password: 123</div>
            {error && <div style={{color: 'red'}}>
                {error}
            </div>}
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required('Please input your username!')]}
            >
                <Input value={username}
                       onChange={e => setUsername(e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('Please input your password!')]}
            >
                <Input.Password value={password}
                                onChange={e => setPassword(e.target.value)}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
