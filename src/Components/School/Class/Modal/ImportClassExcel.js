import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

const ImportClassExcel = (props) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (file) => {
    checkValidFile(file);
  };

  const checkValidFile = async (file) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("gradeId", props.gradeID);
    formData.append("schoolId", window.location.pathname.split("/")[2]);
    formData.append("file", file.excelFile[0].originFileObj);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/student/validate`, formData, {
        responseType: "blob",
      })
      .then((res) => {
        if (res.data.size === 0) {
          //import
          importFile(file);
        } else {
          let headerLine = res.headers["content-disposition"];
          let fileName = headerLine.split("filename=")[1];
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          message.error(
            "Imported file may have not follow the right format, Please check again!"
          );
          setLoading(false);
          setFileList([]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const importFile = async (file) => {
    let formData = new FormData();
    formData.append("gradeId", props.gradeID);
    formData.append("schoolId", window.location.pathname.split("/")[2]);
    formData.append("file", file.excelFile[0].originFileObj);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/student/import`, formData, {
        responseType: "blob",
      })
      .then((res) => {
        if (res.data.size === 0) {
          setLoading(false);
          handleCancel();
          message.success("Import successfully!");
        } else {
          let headerLine = res.headers["content-disposition"];
          let fileName = headerLine.split("filename=")[1];
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          message.error("Some student's ID are not exist");
          setLoading(false);
          setFileList([]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <>
      <Button
        type="primary"
        size="large"
        icon={<UploadOutlined />}
        style={{ marginRight: 5 }}
        onClick={showModal}
      >
        Import Class from Excel
      </Button>
      <Modal
        title="Import Class from Excel"
        visible={visible}
        onCancel={handleCancel}
        okText="Import"
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
            name="excelFile"
            label="Excel file"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Please select an excel file to upload!",
              },
            ]}
          >
            <Upload
              listType="text"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={(info) => {
                console.log(info.file.type);
                if (
                  info.file.type !==
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ) {
                  message.error(`${info.file.name} is not an excel file`);
                  setFileList([]);
                } else {
                  handleChange(info);
                }
              }}
            >
              {fileList.length === 1 ? null : (
                <Button icon={<UploadOutlined />}>Upload Excel File</Button>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ImportClassExcel;
