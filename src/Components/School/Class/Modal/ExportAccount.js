import React, { useState } from "react";
import axios from "axios";
import { Button, Popconfirm, message } from "antd";
import { DownloadOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { getJwt } from "../../../../helper/jwt";

const ExportAccount = (props) => {
  const [loading, setLoading] = useState(false);

  const exportStudentAccount = async () => {
    setLoading(true);
    let gradeID = props.gradeID;
    let schoolID = window.location.pathname.split("/")[2];
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/student/export/account?gradeId=${gradeID}&schoolId=${schoolID}`,
        {
          responseType: "blob",
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        let headerLine = res.headers["content-disposition"];
        let fileName = headerLine.split("filename=")[1];
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        setLoading(false);
        message.success("Export student account successfully");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        message.error("Fail to export student account");
      });
  };

  return (
    <Popconfirm
      placement="topRight"
      title="Do you want to export Student's account"
      onConfirm={() => {
        exportStudentAccount();
      }}
      okText="Yes"
      cancelText="No"
      icon={<QuestionCircleOutlined style={{ color: "#1890ff" }} />}
    >
      <Button
        size="large"
        icon={<DownloadOutlined />}
        type="default"
        loading={loading}
        style={{
          marginRight: 5,
        }}
      >
        Export Student's Account
      </Button>
    </Popconfirm>
  );
};

export default ExportAccount;
