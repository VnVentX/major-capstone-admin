import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Card, Descriptions } from "antd";
import { Link } from "react-router-dom";

const ViewStudent = (props) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});

  const getStudentByID = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/student/${props.data.id}`)
      .then((res) => {
        setData(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const showModal = () => {
    getStudentByID();
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
        <Link to="#">{props.data.fullName}</Link>
      </Button>
      <Modal
        title="Student Profile"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        width={900}
      >
        <Card>
          <Descriptions layout="vertical">
            <Descriptions.Item
              label="Full Name"
              labelStyle={{ fontWeight: "bold" }}
            >
              {data?.fullName}
            </Descriptions.Item>
            <Descriptions.Item
              label="Account"
              labelStyle={{ fontWeight: "bold" }}
            >
              {props.data.username}
            </Descriptions.Item>
            <Descriptions.Item label="DOB" labelStyle={{ fontWeight: "bold" }}>
              {data.doB}
            </Descriptions.Item>
            <Descriptions.Item
              label="Parent Name"
              labelStyle={{ fontWeight: "bold" }}
            >
              {data.parentName}
            </Descriptions.Item>
            <Descriptions.Item
              label="Contact"
              labelStyle={{ fontWeight: "bold" }}
            >
              {data.contact}
            </Descriptions.Item>
            <Descriptions.Item
              label="Action"
              labelStyle={{ fontWeight: "bold" }}
            >
              <Button type="ghost" size="small" onClick={showModal}>
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
