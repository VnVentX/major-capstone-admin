import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Select, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const ExportClassExcel = (props) => {
  const [visible, setVisible] = useState(false);
  const [subject, setSubject] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    getSubjectByGrade();
  }, []);

  const getSubjectByGrade = async () => {
    await axios
      .get(
        `https://mathscienceeducation.herokuapp.com/grade/${props.gradeID}/subjects`
      )
      .then((res) => {
        setSubject(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const exportGradeScore = async (values) => {
    let gradeID = props.gradeID;
    let schoolID = window.location.pathname.split("/")[2];
    let subjectID = values.subject;
    await axios
      .get(
        `https://mathscienceeducation.herokuapp.com/student/export?gradeId=${gradeID}&schoolId=${schoolID}&subjectId=${subjectID}`,
        {
          responseType: "arraybuffer",
        }
      )
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "test.xlsx");
        document.body.appendChild(link);
        link.click();
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

  const onFinish = (values) => {
    exportGradeScore(values);
  };

  return (
    <>
      <Button
        type="primary"
        size="large"
        icon={<DownloadOutlined />}
        onClick={showModal}
      >
        Import Class from Excel
      </Button>
      <Modal
        title="Import Class from Excel"
        visible={visible}
        onCancel={handleCancel}
        destroyOnClose
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
      >
        <Form {...layout} form={form}>
          <Form.Item
            name="subject"
            label="Subject"
            rules={[
              {
                required: true,
                message: "Please select an excel file to upload!",
              },
            ]}
          >
            <Select placeholder="Choose a Subject">
              {subject?.map((item, idx) => (
                <Select.Option key={idx} value={item?.id}>
                  {item?.subjectName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ExportClassExcel;
