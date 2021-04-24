import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddNewProgress = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState([]);

  const getUnitBySubjectID = async () => {
    let subjectID = window.location.pathname.split("/")[2];
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/subject/${subjectID}/unitAterIds`)
      .then((res) => {
        setUnit(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const showModal = () => {
    getUnitBySubjectID();
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = async (values) => {
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/progressTest`, {
        description: values.description?.replace(/\s+/g, " ").trim(),
        subjectId: window.location.pathname.split("/")[2],
        progressTestName: values.progressTest?.replace(/\s+/g, " ").trim(),
        unitAfterId: values.unitAfter,
      })
      .then((res) => {
        console.log(res);
        props.getProgressTestBySubjectID();
        setLoading(false);
        handleCancel();
        message.success("Create Progress Test successfully!");
        form.resetFields();
      })
      .catch((e) => {
        if (e.response.data === "EXISTED") {
          message.error("This Progress Test name is already existed");
        } else {
          message.error("Fail to create Progress Test");
        }
        setLoading(false);
      });
  };

  return (
    <div>
      <Button
        type="primary"
        size="large"
        onClick={showModal}
        icon={<PlusOutlined />}
      >
        Create Progress Test
      </Button>
      <Modal
        title="Create Progress Test"
        visible={visible}
        okText="Create"
        onCancel={handleCancel}
        confirmLoading={loading}
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
            name="progressTest"
            label="Progress Test Name"
            rules={[
              { required: true, message: "Please input Progress Test name" },
              { max: 20, message: "Can only input 20 characters" },
            ]}
          >
            <Input placeholder="Progress Test Name" maxLength={21} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea
              placeholder="Progress Test Description"
              maxLength={50}
              showCount
            />
          </Form.Item>
          <Form.Item
            name="unitAfter"
            label="Unit After"
            rules={[{ required: true, message: "Please select a unit" }]}
          >
            <Select placeholder="Place Progress Test after this Unit">
              {unit?.map((i) => (
                <Select.Option value={i.id}>Unit {i.unitName}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewProgress;
