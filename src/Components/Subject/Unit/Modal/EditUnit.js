import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Select, Tooltip, message } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const EditUnit = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      unit: props.data.unitName + "",
      description: props.data.description,
    });
  }, [form, props.data.description, props.data.unitName]);

  const editUnit = async (values) => {
    setLoading(true);
    await axios
      .put(`https://mathscienceeducation.herokuapp.com/unit/${props.data.id}`, {
        description: values.description,
        unitName: values.unit,
        subjectId: window.location.pathname.split("/")[2],
      })
      .then((res) => {
        console.log(res);
        props.getUnitBySubjectID();
        setLoading(false);
        handleCancel();
        message.success("Edit Unit successfully!");
        form.resetFields();
      })
      .catch((e) => {
        console.log(e);
        message.error("Fail to edit Unit");
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
    editUnit(values);
  };

  return (
    <div>
      <Tooltip title="Edit">
        <Button type="primary" icon={<EditOutlined />} onClick={showModal} />
      </Tooltip>
      <Modal
        title="Edit Unit"
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
          <Form.Item name="unit" label="Unit">
            <Select placeholder="Choose a unit">
              <Option value="1">Unit 1</Option>
              <Option value="2">Unit 2</Option>
              <Option value="3">Unit 3</Option>
              <Option value="4">Unit 4</Option>
              <Option value="5">Unit 5</Option>
              <Option value="6">Unit 6</Option>
              <Option value="7">Unit 7</Option>
              <Option value="8">Unit 8</Option>
              <Option value="9">Unit 9</Option>
              <Option value="10">Unit 10</Option>
              <Option value="11">Unit 11</Option>
              <Option value="12">Unit 12</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ max: 50, message: "Can only input 50 characters" }]}
          >
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

export default EditUnit;
