import {Button, Drawer, Form, Input, Modal, Select} from "antd";
import {CustomLabel} from "../../common/customLabel";
import {createUser, editUser, getAllHobbiesList} from "../../../service/api";
import "./ViewUser.css"
import {useEffect, useState} from "react";

const ViewUser = ({visibility, onClose, data, type, getUsers}) => {
    const [hobbyNames, setHobbyNames] = useState([]);
    const {confirm} = Modal;
    const [updateForm] = Form.useForm();
    useEffect(() => {
        const fetchHobbies = async () => {
            const hobbies = await getAllHobbiesList();
            setHobbyNames(hobbies);
        };

        fetchHobbies();
    }, []);
    const onCloseDrawer = () => {
        confirm({
            title: 'Confirm',
            content: 'Are you sure you want to exit?',
            onOk() {
                onClose()
            },
            okText: 'Yes',
            cancelText: 'No',
            icon: ''
        });
    }
    const onSubmitHandler = async () => {
        console.log(data)
        if (type === "EDIT") {
            let requestBody
            requestBody = {
                id: updateForm.getFieldsValue().id,
                name: updateForm.getFieldsValue().name,
                email: updateForm.getFieldsValue().email,
                contactNumbers: [
                    {
                        contactNo: updateForm.getFieldsValue().phno0,
                        contactType: updateForm.getFieldsValue().phtype0
                    },
                    {
                        contactNo: updateForm.getFieldsValue().phno1,
                        contactType: updateForm.getFieldsValue().phtype1
                    },
                ]

            }
            await editUser(data.userId, requestBody);
            getUsers();
            onClose();

        } else if (type === "CREATE") {
            let requestBody

            requestBody = {

                name: updateForm.getFieldsValue().name,
                email: updateForm.getFieldsValue().email,
                password: 1234,
                contactNumbers: [
                    {
                        contactNo: updateForm.getFieldsValue().phno,
                        contactType: updateForm.getFieldsValue().phtype
                    },
                    {
                        contactNo: updateForm.getFieldsValue().phno2,
                        contactType: updateForm.getFieldsValue().phtype2
                    },
                ]
            }
            await createUser(requestBody);
            updateForm.resetFields();
            getUsers();
            onClose();
        }

    }
    return (

        <Drawer
            extra={
                <Button
                    htmlType="submit"
                    onClick={onSubmitHandler}
                >
                    Submit
                </Button>
            }
            width={800}
            title={type === "EDIT" ? "Edit user" : type === "VIEW" ? "View User" : "Create User"}
            placement="right"
            onClose={onCloseDrawer} visible={visibility}>
            {
                type === "VIEW" &&
                <>
                    <CustomLabel title="Email" value={data.email}/>
                    <CustomLabel title="Name" value={data.name}/>
                    <CustomLabel title="Password" value={data.password}/>
                    {
                        data.contactNumbers.map((item, index) => (
                            <div key={index} className="contactContainer">
                                <CustomLabel title={"Phone number No -" + parseInt(index + 1)} value={item.contactNo}/>
                                <CustomLabel title={"Phone Number No-" + parseInt(index + 1) + " Type"}
                                             value={item.contactType}/>
                            </div>

                        ))
                    }


                </>
            }
            {
                type === "EDIT" &&
                <> <Form
                    labelCol={{span: 6}}
                    className="mt-5"
                    layout="horizontal"
                    form={updateForm}
                    scrollToFirstError
                    autoComplete="off"
                >

                    <Form.Item
                        name="name"
                        label="Name"
                        initialValue={data.name}
                        rules={[
                            {
                                message: 'Name cannot be empty.',
                                required: true,
                            },

                        ]}
                    >
                        <Input/>
                    </Form.Item>


                    <Form.Item
                        name="email"
                        label="Email"
                        initialValue={data.email}
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
                        name="hobbie"
                        label="User Hobbie"
                        initialValue={data.hobbie}
                        rules={[
                            {
                                message: 'User Hobbie cannot be empty.',
                                required: true,
                            },

                        ]}
                    >
                        <Select
                            placeholder="Select User Hobbie"
                            showSearch
                            optionFilterProp="children"
                        >
                            {hobbyNames.map((hobby, index) => (
                                <Select.Option key={index} value={hobby}>
                                    {hobby}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {
                        data.contactNumbers.map((item, index) => (
                            <>
                                <Form.Item
                                    name={"phno" + index}
                                    label={"Phone number No -" + parseInt(index + 1)}
                                    initialValue={item.contactNo}
                                    rules={[
                                        {
                                            message: 'Phone number cannot be empty.',
                                            required: true,
                                        },
                                        {
                                            min: 9,
                                            message: 'Phone Number must be at least 9 characters long.',
                                        },
                                        {
                                            max: 10,
                                            message: 'Phone Number cant be more than 10 characters long',
                                        },
                                        {
                                            message: 'Please enter numbers only for Phone number.',
                                            pattern: /^[0-9]+$/,
                                            type: 'string',
                                        },
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    name={"phtype" + index}
                                    label={"Phone Number No-" + parseInt(index + 1) + " Type"}
                                    initialValue={item.contactType}
                                    rules={[
                                        {
                                            message: 'Phone number cannot be empty.',
                                            required: true,
                                        },
                                        {
                                            min: 9,
                                            message: 'Phone Number must be at least 9 characters long.',
                                        },
                                        {
                                            max: 10,
                                            message: 'Phone Number cant be more than 10 characters long',
                                        },
                                        {
                                            message: 'Please enter numbers only for Phone number.',
                                            pattern: /^[0-9]+$/,
                                            type: 'string',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select Phone Number Type"
                                        showSearch
                                        optionFilterProp="children"
                                    >
                                        <Select.Option value={"HOME"}
                                                       key={1}>HOME NUMBER</Select.Option>)
                                        <Select.Option value={"PERSONAL"}
                                                       key={2}>PERSONAL</Select.Option>)

                                    </Select>
                                </Form.Item>

                            </>


                        ))
                    }


                </Form>
                </>
            }
            {
                type === "CREATE" &&
                <> <Form
                    labelCol={{span: 6}}
                    className="mt-5"
                    layout="horizontal"
                    form={updateForm}
                    scrollToFirstError
                    autoComplete="off"
                >

                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                message: 'Name cannot be empty.',
                                required: true,
                            },

                        ]}
                    >
                        <Input placeholder="Input Name"/>
                    </Form.Item>

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
                        <Input placeholder="Input Email"/>
                    </Form.Item>
                    <Form.Item
                        name="hobbie"
                        label="User Hobbie"
                        rules={[
                            {
                                message: 'User Hobbie cannot be empty.',
                                required: true,
                            },

                        ]}
                    >
                        <Select
                            placeholder="Select User Hobbie"
                            showSearch
                            optionFilterProp="children"
                        >
                            {hobbyNames.map((hobby, index) => (
                                <Select.Option key={index} value={hobby}>
                                    {hobby}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="phno"
                        label="Phone number"
                        rules={[
                            {
                                message: 'Phone number cannot be empty.',
                                required: true,
                            },
                            {
                                message: 'Please enter numbers only for Phone number.',
                                pattern: /^[0-9]+$/,
                                type: 'string',
                            },
                            {
                                min: 9,
                                message: 'Phone Number must be at least 9 characters long.',
                            },
                            {
                                max: 10,
                                message: 'Phone Number cant be more than 10 characters long',
                            }
                        ]}
                    >
                        <Input placeholder="Input Phone number"/>
                    </Form.Item>

                    <Form.Item
                        name="phtype"
                        label="Phone Number Type"
                        rules={[
                            {
                                message: 'Phone Number Type cannot be empty.',
                                required: true,
                            },
                            {
                                min: 9,
                                message: 'Phone Number must be at least 9 characters long.',
                            },
                            {
                                max: 10,
                                message: 'Phone Number cant be more than 10 characters long',
                            },
                            {
                                message: 'Please enter numbers only for Phone number.',
                                pattern: /^[0-9]+$/,
                                type: 'string',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select Phone Number Type"
                            showSearch
                            optionFilterProp="children"
                        >
                            <Select.Option value={"HOME"}
                                           key={1}>HOME NUMBER</Select.Option>)
                            <Select.Option value={"PERSONAL"}
                                           key={2}>PERSONAL</Select.Option>)

                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="phno2"
                        label="Phone number 2"
                        rules={[
                            {
                                message: 'Phone number cannot be empty.',
                                required: true,
                            },
                            {
                                message: 'Please enter numbers only for Phone number.',
                                pattern: /^[0-9]+$/,
                                type: 'string',
                            },

                        ]}
                    >
                        <Input placeholder="Input Phone number"/>
                    </Form.Item>

                    <Form.Item
                        name="phtype2"
                        label="Phone Number 2 Type"
                        rules={[
                            {
                                message: 'Phone Number Type cannot be empty.',
                                required: true,
                            },

                        ]}
                    >
                        <Select
                            placeholder="Select Phone Number Type"
                            showSearch
                            optionFilterProp="children"
                        >
                            <Select.Option value={"HOME"}
                                           key={1}>HOME NUMBER</Select.Option>)
                            <Select.Option value={"PERSONAL"}
                                           key={2}>PERSONAL</Select.Option>)

                        </Select>
                    </Form.Item>

                </Form>
                </>
            }
        </Drawer>
    );
}

export default ViewUser;
