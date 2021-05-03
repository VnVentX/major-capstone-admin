import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getJwt } from "../../../../helper/jwt";

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
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((res) => {
        if (res.data.size === 0 && res.status === 200) {
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
        if (e.response?.status === 413) {
          message.error("Class's maximum student exceed, please check again!");
        } else if (e.response?.status === 400) {
          message.error("Can not import empty sheet, please check again!");
        } else {
          message.error("Fail to import file!");
        }
        setLoading(false);
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
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((res) => {
        if (res.data.size === 0 && res.status === 201) {
          console.log("Import success");
          props.getClassBySchoolGrade(props.gradeID);
          setLoading(false);
          handleCancel();
          message.success("Import successfully!");
        } else if (res.status === 200) {
          console.log("Import success but ID not exist");
          let headerLine = res.headers["content-disposition"];
          let fileName = headerLine.split("filename=")[1];
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          props.getClassBySchoolGrade(props.gradeID);
          message.error("Some student's ID are not exist");
          setLoading(false);
          setFileList([]);
        }
      })
      .catch((e) => {
        console.log(e);
        console.log("Import fail");
        if (e.response.status === 400) {
          message.error("Something is wrong, please try again");
        } else {
          message.error("Fail to import file!");
        }
        setLoading(false);
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
        cancelText="Close"
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
