import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const { htmlToText } = require("html-to-text");

const AddNewAnnouncement = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (event) => {
    console.log(event);
    const shortDes = htmlToText(event.content, {
      wordwrap: 10,
    });
    async function createNews() {
      await axios
        .post("https://mathscienceeducation.herokuapp.com/news", {
          id: 0,
          newsTitle: event.title,
          shortDescription: shortDes.slice(0, 50),
          newsContent: event.content,
          createdDate: null,
          createdBy: null,
          modifiedDate: null,
          accountId: 1,
          disable: false,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    createNews();
  };

  const custom_config = {
    extraPlugins: [MyCustomUploadAdapterPlugin],
  };

  return (
    <div>
      <Button type="primary" size="large" onClick={showModal}>
        Create New Announcement
      </Button>
      <Modal
        title="Create New Announcement"
        width={1000}
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
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input a title" }]}
          >
            <Input placeholder="Title" />
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
    // URL where to send files.
    this.url = "https://mathscienceeducation.herokuapp.com/api/v1/test";
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

    xhr.open(
      "POST",
      "https://mathscienceeducation.herokuapp.com/api/v1/test",
      true
    );
    xhr.responseType = "text";
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    // xhr.setRequestHeader("Authorization", getToken());
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
      data.append("file", result);
      this.xhr.send(data);
    });
  }
}

export default AddNewAnnouncement;
