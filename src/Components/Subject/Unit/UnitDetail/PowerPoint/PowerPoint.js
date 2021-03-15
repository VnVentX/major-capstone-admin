import React from "react";
import { Typography } from "antd";
import Edit from "./Edit";

const { Title } = Typography;

const PowerPoint = (props) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={1}>Power Point</Title>
        <Edit />
      </div>
      <div id="layout" className="non-fs">
        <iframe
          title="lesson 1"
          src="https://onedrive.live.com/embed?resid=1EB9A25728760E08%215189&amp;authkey=%21AFuemMImkjPq4Yk&amp;em=2&amp;wdAr=1.7786561264822134"
          frameBorder="0"
        />
      </div>
    </>
  );
};

export default PowerPoint;
