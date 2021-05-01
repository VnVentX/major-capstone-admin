import React, { useState } from "react";
import axios from "axios";
import { Button, Popconfirm, message } from "antd";
import { DownloadOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const ExportFinalScore = (props) => {
  const [loading, setLoading] = useState(false);

  const exportGradeScore = async () => {
    setLoading(true);
    props.handleGraduateLoading(true);
    let gradeID = props.gradeID;
    let schoolID = window.location.pathname.split("/")[2];
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/student/export/scoreFinal?gradeId=${gradeID}&schoolId=${schoolID}`,
        { responseType: "blob" }
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
        props.getClassBySchoolGrade(props.gradeID);
        message.success("Export report successfully");
        props.handleGraduateLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        message.error("Fail to export report");
        props.handleGraduateLoading(false);
      });
  };

  return (
    <Popconfirm
      placement="topRight"
      title={
        <span>
          This action can not be reversible.
          <br />
          Do you want to continue ?<br />
          (This action will move all students
          <br />
          to PENDING class)
        </span>
      }
      onConfirm={exportGradeScore}
      okText="Yes"
      cancelText="No"
      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
    >
      <Button
        size="large"
        icon={<DownloadOutlined />}
        type="default"
        loading={loading}
      >
        Graduate
      </Button>
    </Popconfirm>
  );
};

export default ExportFinalScore;
