import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Select, message } from "antd";
import { LinkOutlined } from "@ant-design/icons";
const { Option } = Select;

const LinkNewSchool = (props) => {
  const [form] = Form.useForm();
  const [schoolList, setSchoolList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const getSchoolList = async () => {
    let gradeID = window.location.pathname.split("/")[2];
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/school/all/${gradeID}`)
      .then((res) => {
        setSchoolList(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const linkSchool = async (schoolID) => {
    setLoading(true);
    let gradeID = window.location.pathname.split("/")[2];
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/schoolGrade`, {
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
        handleCancel();
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data === "CANNOT LINK INACTIVE SCHOOL") {
          message.error("This school has been disabled, please try again!");
          getSchoolList();
          form.resetFields();
        } else {
          message.error("Fail to link this school");
        }
        setLoading(false);
      });
  };

  const showModal = () => {
    setVisible(true);
    getSchoolList();
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = async (values) => {
    await linkSchool(values.school);
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
              {schoolList?.map((i) =>
                i.status === "ACTIVE" ? (
                  <Option key={i.id} value={i.id}>
                    {i.schoolLevel === "PRIMARY" ? (
                      <>TH {i.schoolName}</>
                    ) : i.schoolLevel === "JUNIOR" ? (
                      <>THCS {i.schoolName}</>
                    ) : (
                      <>THPT {i.schoolName}</>
                    )}
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
