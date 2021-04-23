import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Select, Tooltip, message } from "antd";
import { EditOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const EditProgressTest = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState([]);

  useEffect(() => {
    form.setFieldsValue({
      progressTest: props.data.progressTestName,
      description: props.data.description,
      unitAfter: props.data.unitAfterId,
    });
  }, [
    form,
    props.data.description,
    props.data.progressTestName,
    props.data.unitAfterId,
  ]);

  const getUnitBySubjectID = async () => {
    let subjectID = window.location.pathname.split("/")[2];
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/subject/${subjectID}/unitAterIds`)
      .then((res) => {
        console.log(res.data);
        let unit = [];
        unit = res.data;
        unit.push({
          id: props.data.unitAfterId,
          unitName: props.data.unitAfterName,
        });
        setUnit(unit);
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
      .put(`${process.env.REACT_APP_BASE_URL}/progressTest/${props.data.id}`, {
        description: values.description.replace(/\s+/g, " "),
        id: props.data.id,
        subjectId: window.location.pathname.split("/")[2],
        progressTestName: values.progressTest.replace(/\s+/g, " "),
        unitAfterId: values.unitAfter,
      })
      .then((res) => {
        console.log(res);
        props.getProgressTestBySubjectID();
        setLoading(false);
        handleCancel();
        message.success("Edit Progress Test successfully!");
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
      <Tooltip title="Edit">
        <Button type="primary" icon={<EditOutlined />} onClick={showModal} />
      </Tooltip>
      <Modal
        title="Edit Progress Test"
        visible={visible}
        okText="Update"
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
              { max: 20, message: "Can only input 20 characters" },
              { required: true, message: "Please input Progress Test name" },
            ]}
          >
            <Input placeholder="Progress Test Name" maxLength={21} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ max: 50, message: "Can only input 50 characters" }]}
          >
            <Input.TextArea
              placeholder="Progress Test Description"
              maxLength={50}
              showCount
            />
          </Form.Item>
          <Form.Item name="unitAfter" label="Unit After">
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

export default EditProgressTest;
