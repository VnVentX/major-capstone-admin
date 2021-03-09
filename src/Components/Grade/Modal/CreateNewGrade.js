import React, { useState } from "react";
import { Button, Modal, Form, Select } from "antd";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const CreateNewGrade = () => {
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
      <Button type="primary" size="large" onClick={showModal}>
        Create new Grade
      </Button>
      <Modal
        title="Create new Grade"
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
        <Form {...layout} form={form} name="add-questions">
          <Form.Item
            name="grade"
            label="Select a Grade"
            rules={[
              {
                required: true,
                message: "Please select a Grade",
              },
            ]}
          >
            <Select showSearch placeholder="Select a Grade">
              <Option value="Grade 1">Grade 1</Option>
              <Option value="Grade 2">Grade 2</Option>
              <Option value="Grade 3">Grade 3</Option>
              <Option value="Grade 4">Grade 4</Option>
              <Option value="Grade 5">Grade 5</Option>
              <Option value="Grade 6">Grade 6</Option>
              <Option value="Grade 7">Grade 7</Option>
              <Option value="Grade 8">Grade 8</Option>
              <Option value="Grade 9">Grade 9</Option>
              <Option value="Grade 10">Grade 10</Option>
              <Option value="Grade 11">Grade 11</Option>
              <Option value="Grade 12">Grade 12</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateNewGrade;
