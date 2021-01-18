import React, { useState } from "react";
import { Select, Form, Modal, Input } from "antd";
const { Option } = Select;

const EditCategory = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onFinish = (values) => {
    console.log(values);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <div>
      <button
        className="ant-btn-link"
        onClick={() => {
          showModal();
        }}
      >
        Edit
      </button>
      <Modal
        visible={visible}
        title="Edit Category"
        okText="Update"
        cancelText="Cancel"
        onCancel={handleCancel}
        destroyOnClose
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
      >
        <Form
          form={form}
          name="update_form"
          autoComplete="off"
          preserve={false}
          layout="vertical"
          initialValues={{
            q_name: props.data.q_name,
            q_audio: "Q1",
            q_img: "Q1",
          }}
        >
          <Form.Item
            label="Grade"
            name="grade"
            initialValue="1"
            rules={[
              {
                required: true,
                message: "Please select grade",
              },
            ]}
          >
            <Select>
              <Option value="1">Grade 1</Option>
              <Option value="2">Grade 2</Option>
              <Option value="3">Grade 3</Option>
              <Option value="4">Grade 4</Option>
              <Option value="5">Grade 5</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Subject"
            name="subject"
            initialValue="math"
            rules={[
              {
                required: true,
                message: "Please select subject",
              },
            ]}
          >
            <Select>
              <Option value="math">Math</Option>
              <Option value="science">Science</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            initialValue="Quiz 1"
            rules={[
              {
                required: true,
                message: "Please input category",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditCategory;
