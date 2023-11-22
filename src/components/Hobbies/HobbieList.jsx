// src/components/UserList.jsx
import React, {useEffect, useState} from 'react';
import {deleteHobbies, getAllHobbies} from '../../service/api';

import {Button, Menu, Modal, Row, Table} from "antd";
import {useNavigate} from "react-router-dom";
import ViewHobbie from "./compoennt/ViewHobbie";

const HobbieList = () => {
    const navigate = useNavigate();
    const {confirm} = Modal;
    const [hobbies, setHobbies] = useState([]);
    const [hobbiesVisible, setHobbiesVisible] = useState({visbility: false, type: null, data: null});
    const onDelete = (id) => {
        confirm({
            title: 'Confirm',
            content: 'Are you sure you want to Delete?',
            onOk() {
                deleteHobbie(id)
            },
            okText: 'Yes',
            cancelText: 'No',
            icon: ''
        });
    }

    const deleteHobbie = async (id) => {
        await deleteHobbies(id);
        getHobbiesList();
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
                            key: 'setting:2',
                        },
                    ],
                },
            ],
        },

    ];
    useEffect(() => {
        getHobbiesList();
    }, []);
    const getHobbiesList = async () => {
        try {
            const response = await getAllHobbies();
            setHobbies(response);
        } catch (error) {
            // Handle error, e.g., show a notification
            console.error('Error fetching hobbies:', error);
        }
    }

    // const dataSource = [
    //     {
    //         key: '1',
    //         Hobbie: 'Mike',
    //         Owner: '10 Downing Street',
    //     },
    //     {
    //         key: '2',
    //         Hobbie: 'John',
    //         Owner: '10 Downing Street',
    //     },
    // ];
    const columns = [
        {
            title: 'Hobbies',
            dataIndex: 'hobbyName',
            key: 'hobbyName',
        },
        {
            title: 'Users',
            dataIndex: 'user',
            key: 'user',
            render: (users) => {
                if (users && users.length > 0) {
                    const userName = users[0].name;
                    return <span>{userName}</span>;
                } else {
                    return <span>Empty</span>; // Return an empty span if no user is available
                }
            },
        },

        {
            title: 'Action',
            render: (data) => {
                return (
                    <div style={{display: 'flex', gap: '10px'}}>
                        <Button onClick={() => onDelete(data.id)}>
                            Delete
                        </Button>
                    </div>
                )
            }
        },
    ];
    const onClick = (e) => {
        console.log('click ', e);
        // Log a string when "Option 1" is clicked
        if (e.key === 'setting:2') {
            navigate('/');
        }
    };

    const onClose = () => {
        setHobbiesVisible({visbility: false, type: null})
    }
    return (
        <div style={{padding: 20}}>
            <Row className="navigation-log-out ">
                <Menu onClick={onClick} mode="horizontal" items={items} style={{textAlign: 'left'}}/>
                <Button onClick={() => navigate('/login')} className="ant-second-btn-default"
                        style={{marginLeft: 'auto'}}>Log Out</Button>
            </Row>
            <h1>Hobbies List</h1>
            <div>

                <Row justify="end" gutter={5} style={{paddingRight: 20}}>
                    {/*** Filter buttons ***/}

                    <Button style={{marginBottom: 10}}
                            onClick={() => setHobbiesVisible({visbility: true, type: "CREATE"})} type="primary"
                            htmlType="submit">
                        Add Hobbies
                    </Button>
                </Row>
            </div>
            < Table

                columns={columns}
                dataSource={hobbies}
                rowKey={record => record.id}

            />
            <ViewHobbie
                data={hobbiesVisible.data}
                visibility={hobbiesVisible.visbility}
                type={hobbiesVisible.type}
                getHobbiesList={getHobbiesList}
                onClose={onClose}
            />
        </div>

    );
};

export default HobbieList;
