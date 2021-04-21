import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, InputNumber, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const AddNewUnit = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const createUnit = async (values) => {
    setLoading(true);
    await axios
      .post("https://mathscienceeducation.herokuapp.com/unit", {
        description: values.description,
        subjectId: window.location.pathname.split("/")[2],
        unitName: values.unit,
      })
      .then((res) => {
        console.log(res);
        props.getUnitBySubjectID();
        setLoading(false);
        handleCancel();
        message.success("Create Unit successfully!");
        form.resetFields();
      })
      .catch((e) => {
        console.log(e);
        message.error("Fail to create Unit");
        setLoading(false);
      });
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (values) => {
    createUnit(values);
  };

  return (
    <div>
      <Button
        type="primary"
        size="large"
        onClick={showModal}
        icon={<PlusOutlined />}
      >
        Create Unit
      </Button>
      <Modal
        title="Create Unit"
        visible={visible}
        okText="Create"
        confirmLoading={loading}
        onCancel={handleCancel}
        destroyOnClose
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onFinish(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form {...layout} form={form}>
          <Form.Item
            name="unit"
            label="Unit"
            rules={[
              { required: true, message: "Please input a unit name" },
              { type: "number", message: "Please input a number" },
            ]}
          >
            <InputNumber placeholder="Unit" min={1} max={100} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea
              placeholder="Unit Description"
              maxLength={50}
              showCount
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewUnit;
