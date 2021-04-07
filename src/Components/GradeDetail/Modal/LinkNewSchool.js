import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Select, message } from "antd";
import { LinkOutlined } from "@ant-design/icons";
const { Option } = Select;

var resArr = [];

const LinkNewSchool = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resArr = Array.from(props.allSchool);
    var ids = new Set(props.data.map(({ id }) => id));
    resArr = resArr.filter(({ id }) => !ids.has(id));
  }, [props.allSchool, props.data]);

  const linkSchool = async (schoolID) => {
    setLoading(true);
    let gradeID = window.location.pathname.split("/")[2];
    await axios
      .post("https://mathscienceeducation.herokuapp.com/schoolGrade", {
        gradeId: gradeID,
        schoolId: schoolID,
      })
      .then((res) => {
        console.log(res);
        props.getSchoolByGradeID(gradeID);
        setLoading(false);
        handleCancel();
        message.success("Link School successfully!");
        form.resetFields();
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        message.success("Fail to link School");
      });
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = async (values) => {
    await linkSchool(values.school);
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
        confirmLoading={loading}
        okText="Create"
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
              {resArr?.map((i) =>
                i.status === "ACTIVE" ? (
                  <Option key={i.id} value={i.id}>
                    Trường Tiểu Học {i.schoolName}
                  </Option>
                ) : null
              )}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LinkNewSchool;
