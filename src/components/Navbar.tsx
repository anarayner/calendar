import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import { MenuOutlined } from '@ant-design/icons';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAuthActions} from "../hooks/useActions";


const Navbar: FC = () => {
    const {isAuth, user} = useTypedSelector(state => state.AuthReducer)

    const {logout} = useAuthActions()

    return (
        <Layout.Header>
            <Row justify={'end'}>
                <Menu
                    style={{flex: 'auto', justifyContent: 'end'}}
                    selectable={false}
                    theme='dark'
                    mode='horizontal'
                    defaultSelectedKeys={["item1"]}
                    overflowedIndicator={<MenuOutlined />}
                >
                    <div>
                        {user.username}
                    </div>
                    {isAuth?
                        <Menu.Item key="1" onClick={()=> logout()}>Logout</Menu.Item>
                        :
                        <Menu.Item key='2'>Login</Menu.Item>
                    }
                </Menu>
            </Row>

        </Layout.Header>
    );
};

export default Navbar;
