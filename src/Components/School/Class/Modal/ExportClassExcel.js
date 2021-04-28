import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Select, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const ExportClassExcel = (props) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState([]);
  const [form] = Form.useForm();

  const getSubjectByGrade = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/grade/${props.gradeID}/subjects`)
      .then((res) => {
        setSubject(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const exportGradeScore = async (values) => {
    setLoading(true);
    let gradeID = props.gradeID;
    let schoolID = window.location.pathname.split("/")[2];
    let subjectID = values.subject;
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/student/export?gradeId=${gradeID}&schoolId=${schoolID}&subjectId=${subjectID}`,
        { responseType: "blob" }
      )
      .then((res) => {
        let headerLine = res.headers["content-disposition"];
        let fileName = headerLine.split("filename=")[1];
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        setLoading(false);
        handleCancel();
        message.success("Export report successfully");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        message.error("Fail to export report");
      });
  };

  const showModal = () => {
    getSubjectByGrade();
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
      <Button size="large" icon={<DownloadOutlined />} onClick={showModal}>
        Export Score
      </Button>
      <Modal
        title="Export Class Report"
        visible={visible}
        onCancel={handleCancel}
        destroyOnClose
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            id="export-class-report"
            key="link"
            type="primary"
            loading={loading}
            onClick={() => {
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
            Export
          </Button>,
        ]}
      >
        <Form {...layout} form={form}>
          <Form.Item
            name="subject"
            label="Subject"
            rules={[
              {
                required: true,
                message: "Please select a Subject",
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
