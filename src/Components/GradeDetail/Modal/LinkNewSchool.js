import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Select } from "antd";
import { LinkOutlined } from "@ant-design/icons";
const { Option } = Select;

var gradeID = window.location.pathname.split("/")[2];
var resArr = [];

const LinkNewSchool = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    resArr = Array.from(props.allSchool);
    var ids = new Set(props.data.map(({ id }) => id));
    resArr = resArr.filter(({ id }) => !ids.has(id));
  }, [props.allSchool, props.data]);

  const linkSchool = async (gradeID, schoolID) => {
    let formData = new FormData();
    formData.append("gradeId ", gradeID);
    formData.append("schoolId ", schoolID);
    await axios
      .post("https://mathscienceeducation.herokuapp.com/schoolGrade", formData)
      .then((res) => {
        console.log(res);
        props.getSchoolByGradeID(gradeID);
      })
      .catch((e) => {
        console.log(e);
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
    await linkSchool(gradeID, values.school);
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
              {resArr?.map((i) => (
                <Option key={i.id} value={i.id}>
                  {i.schoolName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LinkNewSchool;
