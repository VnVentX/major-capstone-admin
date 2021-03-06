import React, { useState } from "react";
import axios from "axios";
import { getJwt, getID } from "../../../../helper/jwt";
import { Button, Modal, Form, Input, message } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const AddNewAnnouncement = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (event) => {
    setLoading(true);
    async function createNews() {
      await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/news`,
          {
            accountId: getID(),
            newsContent: event.content,
            newsTitle: event.title,
            shortDescription: event.shortDes,
          },
          {
            headers: {
              Authorization: getJwt(),
            },
          }
        )
        .then((res) => {
          props.getAllNews();
          form.resetFields();
          setLoading(false);
          handleCancel();
          message.success("Create News successfully!");
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
          message.error("Fail to create News!");
        });
    }
    createNews();
  };

  const custom_config = {
    extraPlugins: [MyCustomUploadAdapterPlugin],
  };

  return (
    <div>
      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Create News
      </Button>
      <Modal
        title="Create News"
        width={1000}
        visible={visible}
        okText="Create"
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
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input title" }]}
          >
            <Input.TextArea
              placeholder="Title"
              maxLength={70}
              showCount
              autoSize
            />
          </Form.Item>
          <Form.Item
            name="shortDes"
            label="Short Description"
            rules={[
              { required: true, message: "Please input short description" },
            ]}
          >
            <Input.TextArea
              placeholder="Short Description"
              maxLength="100"
              showCount
            />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            valuePropName="data"
            getValueFromEvent={(event, editor) => {
              const data = editor.getData();
              return data;
            }}
            rules={[{ required: true, message: "Please enter the content" }]}
          >
            <CKEditor config={custom_config} editor={ClassicEditor} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

class MyUploadAdapter {
  constructor(props) {
    // CKEditor 5's FileLoader instance.
    this.loader = props;
  }

  // Starts the upload process.
  upload() {
    return new Promise((resolve, reject) => {
      this._initRequest();
      this._initListeners(resolve, reject);
      this._sendRequest();
    });
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Example implementation using XMLHttpRequest.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    xhr.open("POST", `${process.env.REACT_APP_BASE_URL}/file`, true);
    xhr.responseType = "text";
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Authorization", getJwt());
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = "Couldn't upload file:" + ` ${loader.file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;
      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        );
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      resolve({
        default: response,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  _sendRequest() {
    const data = new FormData();

    this.loader.file.then((result) => {
      data.append("multipartFile", result);
      this.xhr.send(data);
    });
  }
}

export default AddNewAnnouncement;
