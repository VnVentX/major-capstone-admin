import React, { useState } from "react";
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

const ImportClassExcel = () => {
  const [visible, setVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (event) => {
    console.log(event);
    setFileList([]);
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
