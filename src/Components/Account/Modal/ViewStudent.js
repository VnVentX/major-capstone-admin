import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Descriptions } from "antd";
import { Link } from "react-router-dom";

const ViewStudent = (props) => {
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
      <Button
        type="link"
        size="middle"
        onClick={showModal}
        style={{ padding: 0 }}
      >
        <Link to="#">{`${props.data.firstName} ${props.data.lastName}`}</Link>
      </Button>
      <Modal
        title="Student Profile"
        visible={visible}
        onCancel={handleCancel}
        width={900}
      >
        <Card>
          <Descriptions layout="vertical">
            <Descriptions.Item
              label="Full Name"
              labelStyle={{ fontWeight: "bold" }}
            >
              Trần Thiên Anh
            </Descriptions.Item>
            <Descriptions.Item
              label="Account"
              labelStyle={{ fontWeight: "bold" }}
            >
              DMC_G1_04
            </Descriptions.Item>
            <Descriptions.Item label="DOB" labelStyle={{ fontWeight: "bold" }}>
              1998/06/11
            </Descriptions.Item>
            <Descriptions.Item
              label="Parent Name"
              labelStyle={{ fontWeight: "bold" }}
            >
              Tran Minh Thanh
            </Descriptions.Item>
            <Descriptions.Item
              label="Telephone"
              labelStyle={{ fontWeight: "bold" }}
            >
              1810000000
            </Descriptions.Item>
            <Descriptions.Item
              label="Action"
              labelStyle={{ fontWeight: "bold" }}
            >
              <Button
                type="ghost"
                size="small"
                onClick={showModal}
              >
                Reset Password
              </Button>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Modal>
    </div>
  );
};

export default ViewStudent;
