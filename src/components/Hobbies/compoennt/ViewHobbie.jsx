import {Button, Drawer, Form, Input, Modal} from "antd";
import {createHobbies} from "../../../service/api";


const ViewHobbie = ({visibility, onClose, data, type, getHobbiesList}) => {
    const {confirm} = Modal;
    const [updateForm] = Form.useForm();
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
        const response = await createHobbies(updateForm.getFieldsValue());
        if (response.status === "success") {
            onClose();
            updateForm.resetFields();
            getHobbiesList();
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
            width={650}
            title={"Create Hobbie"}
            placement="right" onClose={onCloseDrawer} visible={visibility}>
            <Form
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
                    <Input/>
                </Form.Item>
            </Form>
        </Drawer>
    );
}

export default ViewHobbie;
