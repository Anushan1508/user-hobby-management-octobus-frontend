// src/components/UserList.jsx
import React, {useEffect, useState} from 'react';
import {getAllUsers, userDelete} from '../../service/api';

import {Button, Menu, Modal, Row, Table} from "antd";
import ViewUser from "./component/ViewUser";
import {useNavigate} from "react-router-dom";
import "../../App.css"

const UserList = () => {
    const navigate = useNavigate();
    const {confirm} = Modal;
    const [users, setUsers] = useState();
    const [userVisibilty, setUserVisibilty] = useState({visibility: false, type: null, data: null});

    const onCloseView = () => {
        setUserVisibilty(false)
    }
    const onDelete = (id) => {
        if (id) {
            confirm({
                title: 'Confirm',
                content: 'Are you sure you want to Delete?',
                onOk() {
                    userHobbie(id)
                },
                okText: 'Yes',
                cancelText: 'No',
                icon: ''
            });
        }
    }

    const userHobbie = async (id) => {
        await userDelete(id);
        getUsers();
    }
    const items = [

        {
            label: 'Navigation Menu',
            key: 'SubMenu',
            children: [
                {
                    type: 'group',
                    label: 'Hobbies',
                    children: [
                        {
                            label: 'Hobbies List',
                            key: 'setting:1',
                        },

                    ],
                },
                {
                    type: 'group',
                    label: 'Users',
                    children: [
                        {
                            label: 'Users List',
                            key: 'setting:3',
                        },
                    ],
                },
            ],
        },

    ];
    useEffect(() => {
        getUsers();
    }, []);
    const getUsers = async () => {
        try {
            const response = await getAllUsers();
            console.log(response)
            setUsers(response);
            // getUsers();

        } catch (error) {
            console.error('Error fetching hobbies:', error);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Contacts',
            dataIndex: 'contactNumbers',
            key: 'contacts',
            render: (contactNumbers) => {
                const contactColumns = [
                    {
                        title: 'Contact No',
                        dataIndex: 'contactNo',
                        key: 'no',
                    },
                    {
                        title: 'Contact Type',
                        dataIndex: 'contactType',
                        key: 'type',
                    },
                ];

                return <Table columns={contactColumns} dataSource={contactNumbers} pagination={false}/>;
            },
        },
        {
            title: 'Action',
            render: (data) => {
                return (
                    <div style={{display: 'flex', gap: '10px'}}>
                        <Button onClick={() => setUserVisibilty({visibility: true, type: "EDIT", data: data})}>
                            Edit
                        </Button>
                        <Button onClick={() => setUserVisibilty({visibility: true, type: "VIEW", data: data})}>
                            View
                        </Button>
                        <Button onClick={() => onDelete(data.userId)}>
                            Delete
                        </Button>
                    </div>
                )
            }
        },
    ];

    const onClick = (e) => {
        // Log a string when "Option 1" is clicked
        if (e.key === 'setting:1') {
            navigate('/hobbies');
        }
    };
    return (
        <div style={{padding: 20}}>
            <Row className="navigation-log-out ">
                <Menu onClick={onClick} mode="horizontal" items={items} style={{textAlign: 'left'}}/>
                <Button onClick={() => navigate('/login')} className="ant-second-btn-default"
                        style={{marginLeft: 'auto'}}>Log Out</Button>
            </Row>
            <h1>User List</h1>
            <div>
                <Row justify="end" gutter={5} style={{paddingRight: 20}}>
                    {/*** Filter buttons ***/}
                    <Button style={{marginBottom: 10}}
                            onClick={() => setUserVisibilty({visibility: true, type: "CREATE", data: null})}
                            type="primary" htmlType="submit">
                        Add User
                    </Button>
                </Row>
            </div>

            <Table
                columns={columns}
                dataSource={users}
                rowKey={record => record.id}
            />


            <ViewUser
                data={userVisibilty.data}
                onClose={onCloseView}
                visibility={userVisibilty.visibility}
                getUsers={getUsers}
                type={userVisibilty.type}
            />
        </div>

    );
};

export default UserList;
