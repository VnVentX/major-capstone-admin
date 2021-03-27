import React, { useState } from "react";
import { Button, Modal, Form, Select } from "antd";
import { LinkOutlined } from "@ant-design/icons";
const { Option } = Select;

const LinkNewSchool = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log(values);
    handleCancel();
  };
  return (
    <>
      <Button
        type="primary"
        size="large"
        onClick={showModal}
        icon={<LinkOutlined />}
      >
        Link New School
      </Button>
      <Modal
        title="Link New School"
        visible={visible}
        onCancel={handleCancel}
        okText="Create"
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onFinish(values);
              form.resetFields();
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        destroyOnClose
      >
        <Form form={form}>
          <Form.Item
            name="school"
            label="Select a School"
            rules={[
              {
                required: true,
                message: "Please select a School",
              },
            ]}
          >
            <Select showSearch placeholder="Select a School">
              <Option value="DMC">Dương Minh Châu</Option>
              <Option value="NCT">Nguyễn Chí Thanh</Option>
              <Option value="NVT">Nguyễn Văn Tố</Option>
              <Option value="TQC">Trần Quang Cơ</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LinkNewSchool;
