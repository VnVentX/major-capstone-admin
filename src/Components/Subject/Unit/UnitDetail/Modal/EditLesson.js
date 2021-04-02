import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Tooltip, message } from "antd";
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
          .get(
            `https://mathscienceeducation.herokuapp.com//lesson/${props.lessonID}`
          )
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
    if (values.url.split("/")[0] === "https:") {
      url = values.url;
    } else {
      url = values.url.split(" ")[1].split("src=")[1].split('"')[1];
    }
    setLoading(true);
    await axios
      .put(
        `https://mathscienceeducation.herokuapp.com/lesson/${props.lessonID}`,
        {
          id: props.lessonID,
          lessonName: values.lesson,
          lessonUrl: url,
          unitId: values.unitId,
        }
      )
      .then((res) => {
        console.log(res);
        props.getLessonByUnitID();
        setLoading(false);
        handleCancel();
        message.success("Edit Lesson successfully!");
        form.resetFields();
      })
      .catch((e) => {
        console.log(e);
        message.error("Fail to edit Lesson");
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
            rules={[{ required: true, message: "Please input a subject name" }]}
          >
            <Input placeholder="Lesson Name" />
          </Form.Item>
          <Form.Item
            name="url"
            label="PowerPoint URL"
            rules={[{ required: true, message: "Please input an URL!" }]}
          >
            <Input.TextArea autoSize placeholder="PowerPoint URL" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditLesson;
