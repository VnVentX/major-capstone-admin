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

const EditLesson = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.lessonID) {
      const getLessonByID = async () => {
        await axios
          .get(`${process.env.REACT_APP_BASE_URL}//lesson/${props.lessonID}`)
          .then((res) => {
            form.setFieldsValue({
              lesson: res.data.lessonName,
              url: res.data.lessonUrl,
              unitId: res.data.unitId,
            });
          })
          .catch((e) => {
            console.log(e);
          });
      };
      getLessonByID();
    }
  }, [form, props.lessonID]);

  const editLesson = async (values) => {
    let url = "";
    if (
      values.url.split("/")[0] === "https:" &&
      values.url.split("/")[0] !== undefined
    ) {
      url = values.url;
    } else if (values.url.split(" ")[1] !== undefined) {
      url = values.url.split(" ")[1].split("src=")[1].split('"')[1];
    }

    setLoading(true);
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/lesson/${props.lessonID}`, {
        lessonName: values.lesson,
        lessonUrl: url,
        unitId: window.location.pathname.split("/")[4],
      })
      .then((res) => {
        console.log(res);
        props.getLessonByUnitID();
        setLoading(false);
        handleCancel();
        message.success("Edit Lesson successfully!");
        form.resetFields();
      })
      .catch((e) => {
        if (e.response.data === "EXISTED") {
          message.error("This Lesson name is already existed");
        } else {
          message.error("Fail to edit Lesson");
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
    editLesson(values);
  };

  return (
    <div>
      <Tooltip title="Edit Lesson">
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={showModal}
          style={{ marginLeft: 5 }}
        />
      </Tooltip>
      <Modal
        title="Edit Lesson"
        visible={visible}
        okText="Update"
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
            name="lesson"
            label="Lesson Name"
            rules={[
              { required: true, message: "Please input a lesson name" },
              { type: "number", message: "Please input a number" },
            ]}
          >
            <InputNumber placeholder="Lesson" min={1} max={100} />
          </Form.Item>
          <Form.Item
            name="url"
            label="PowerPoint URL"
            rules={[
              {
                validator: async (_, url) => {
                  if (
                    url.split("/")[0] !== "https:" &&
                    url.split(" ")[0] !== "<iframe"
                  ) {
                    return Promise.reject(
                      new Error("Please input a valid URL!")
                    );
                  }
                },
              },
            ]}
          >
            <Input.TextArea autoSize placeholder="PowerPoint URL" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditLesson;
