import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Tooltip,
  message,
} from "antd";
import { EditOutlined } from "@ant-design/icons";

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
      unit: props.data.unitName,
      description: props.data.description,
    });
  }, [form, props.data.description, props.data.unitName]);

  const editUnit = async (values) => {
    setLoading(true);
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/unit/${props.data.id}`, {
        description: values.description?.replace(/\s+/g, " ").trim(),
        unitName: values.unit,
        subjectId: window.location.pathname.split("/")[2],
      })
      .then((res) => {
        console.log(res);
        props.getUnitBySubjectID();
        props.getAllUnit();
        setLoading(false);
        handleCancel();
        message.success("Edit Unit successfully!");
        form.resetFields();
      })
      .catch((e) => {
        if (e.response.data === "EXISTED") {
          message.error("This Unit name is already existed");
        } else {
          message.error("Fail to edit Unit");
        }
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
          <Form.Item
            name="unit"
            label="Unit"
            rules={[
              { required: true, message: "Please input a unit name" },
              { type: "number", message: "Please input a number" },
            ]}
          >
            <InputNumber
              placeholder="Unit"
              min={1}
              max={100}
              parser={(value) => {
                return value.substring(0, 3);
              }}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                pattern: /^[a-zA-Z0-9_ '`?,.*<>!@#%^&*()_+-~"]*$/,
                message: "Can only input English characters",
              },
            ]}
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
