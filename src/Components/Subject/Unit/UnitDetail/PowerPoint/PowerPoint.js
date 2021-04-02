import React from "react";
import { Typography } from "antd";

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
      </div>

      <div id="layout" className="non-fs">
        <div
          className={document.fullscreenElement === null ? "non-fs" : "fs"}
          dangerouslySetInnerHTML={{
            __html: `
<iframe
  id=${document.fullscreenElement === null ? "nonfs" : "fs"}
  title="lesson 1"
  src='${props.url}'
  frameBorder="0"
  width="100%"
/>
`,
          }}
        />
      </div>
    </>
  );
};

export default PowerPoint;
