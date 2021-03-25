import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form, Input } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5/build/ckeditor";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const EditAnnouncement = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log(props);
    form.setFieldsValue({
      title: props.data.title,
      shortDes: props.data.shortDes,
      content: props.data.content,
    });
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (event) => {
    console.log(event);
    // async function updateNews() {
    //   await axios
    //     .put("https://mathscienceeducation.herokuapp.com/news", null, {
    //       params: {
    //         id: 24,
    //         newsContent: event.content,
    //         newsTitle: event.title,
    //         shortDescription: event.shortDes,
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // }
    // updateNews();
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title="Edit Announcement"
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
            name="shortDes"
            label="Short Description"
            rules={[{ required: true, message: "Please input a title" }]}
          >
            <Input.TextArea
              placeholder="Short Description"
              maxLength="40"
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
            <CKEditor
              editor={Editor}
              config={{
                toolbar: [
                  "heading",
                  "|",
                  "fontfamily",
                  "fontsize",
                  "|",
                  "alignment",
                  "horizontalLine",
                  "|",
                  "fontColor",
                  "fontBackgroundColor",
                  "highlight",
                  "|",
                  "bold",
                  "italic",
                  "|",
                  "link",
                  "|",
                  "outdent",
                  "indent",
                  "|",
                  "bulletedList",
                  "numberedList",
                  "|",
                  "insertTable",
                  "|",
                  "uploadImage",
                  "mediaEmbed",
                  "blockQuote",
                  "|",
                  "undo",
                  "redo",
                ],
                image: {
                  // Configure the available styles.
                  styles: ["alignLeft", "alignCenter", "alignRight"],

                  // Configure the available image resize options.
                  resizeOptions: [
                    {
                      name: "resizeImage:original",
                      label: "Original",
                      value: null,
                    },
                    {
                      name: "resizeImage:25",
                      label: "25%",
                      value: "25",
                    },
                    {
                      name: "resizeImage:50",
                      label: "50%",
                      value: "50",
                    },
                    {
                      name: "resizeImage:75",
                      label: "75%",
                      value: "75",
                    },
                  ],

                  // You need to configure the image toolbar, too, so it shows the new style
                  // buttons as well as the resize buttons.
                  toolbar: [
                    "imageStyle:alignLeft",
                    "imageStyle:alignCenter",
                    "imageStyle:alignRight",
                    "|",
                    "resizeImage",
                    "|",
                    "imageTextAlternative",
                  ],
                },
                table: {
                  contentToolbar: [
                    "tableColumn",
                    "tableRow",
                    "mergeTableCells",
                  ],
                },
                highlight: {
                  options: [
                    {
                      model: "yellowMarker",
                      class: "marker-yellow",
                      title: "Yellow Marker",
                      color: "var(--ck-highlight-marker-yellow)",
                      type: "marker",
                    },
                    {
                      model: "greenMarker",
                      class: "marker-green",
                      title: "Green marker",
                      color: "var(--ck-highlight-marker-green)",
                      type: "marker",
                    },
                    {
                      model: "pinkMarker",
                      class: "marker-pink",
                      title: "Pink marker",
                      color: "var(--ck-highlight-marker-pink)",
                      type: "marker",
                    },
                    {
                      model: "blueMarker",
                      class: "marker-blue",
                      title: "Blue marker",
                      color: "var(--ck-highlight-marker-blue)",
                      type: "marker",
                    },
                    {
                      model: "redPen",
                      class: "pen-red",
                      title: "Red pen",
                      color: "var(--ck-highlight-pen-red)",
                      type: "pen",
                    },
                    {
                      model: "greenPen",
                      class: "pen-green",
                      title: "Green pen",
                      color: "var(--ck-highlight-pen-green)",
                      type: "pen",
                    },
                  ],
                },
                heading: {
                  options: [
                    {
                      model: "paragraph",
                      title: "Paragraph",
                      class: "ck-heading_paragraph",
                    },
                    {
                      model: "heading1",
                      view: "h1",
                      title: "Heading 1",
                      class: "ck-heading_heading1",
                    },
                    {
                      model: "heading2",
                      view: "h2",
                      title: "Heading 2",
                      class: "ck-heading_heading2",
                    },
                    {
                      model: "heading3",
                      view: "h3",
                      title: "Heading 3",
                      class: "ck-heading_heading3",
                    },
                    {
                      model: "heading4",
                      view: "h4",
                      title: "Heading 4",
                      class: "ck-heading_heading4",
                    },
                    {
                      model: "heading5",
                      view: "h5",
                      title: "Heading 5",
                      class: "ck-heading_heading5",
                    },
                    {
                      model: "heading6",
                      view: "h6",
                      title: "Heading 6",
                      class: "ck-heading_heading6",
                    },
                  ],
                },
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditAnnouncement;
