import React, { useState } from "react";
import { Form, Modal, Tooltip, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ViewMatchingQuestion from "./ViewMatchingQuestion";
import ViewChoosingQuestion from "./ViewChoosingQuestion";
import ViewFillingQuestion from "./ViewFillingQuestion";
import ViewSwappingQuestion from "./ViewSwappingQuestion";

const ViewQuestion = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <div>
      <Tooltip title="View Question">
        <Button type="primary" icon={<EyeOutlined />} onClick={showModal} />
      </Tooltip>
      <Modal
        visible={visible}
        width={"45vw"}
        title="View Question"
        cancelText="Cancel"
        onCancel={handleCancel}
        footer={null}
      >
        {props.data?.type === "MATCH" ? (
          <ViewMatchingQuestion form={form} />
        ) : props.data?.type === "CHOOSE" ? (
          <ViewChoosingQuestion form={form} />
        ) : props.data?.type === "FILL" ? (
          <ViewFillingQuestion form={form} />
        ) : props.data?.type === "SWAP" ? (
          <ViewSwappingQuestion form={form} />
        ) : null}
      </Modal>
    </div>
  );
};

export default ViewQuestion;
