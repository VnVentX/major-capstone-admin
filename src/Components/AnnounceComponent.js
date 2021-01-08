import React from "react";
import { Card, List } from "antd";
import {} from "antd";

const data = [
  {
    title: "Announcement 1",
  },
  {
    title: "Announcement 2",
  },
];

const AnnounceComponent = () => {
  return (
    <Card type="inner" title="Announcement" style={{ marginBottom: 20 }}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.title}</a>}
              description="This is a mock demo"
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default AnnounceComponent;
