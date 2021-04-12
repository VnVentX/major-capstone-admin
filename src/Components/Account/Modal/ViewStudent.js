import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Card, Descriptions } from "antd";
import { Link } from "react-router-dom";

const ViewStudent = (props) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const getStudentByID = async () => {
      await axios
        .get(
          `https://mathscienceeducation.herokuapp.com/student/${props.data.id}`
        )
        .then((res) => {
          setData(res.data.length === 0 ? [] : res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getStudentByID();
  }, []);

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
              {data?.firstName} {data?.lastName}
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
              label="Telephone"
              labelStyle={{ fontWeight: "bold" }}
            >
              {data.parentPhone}
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
