import React from "react";
import { Card, List, Popconfirm, message, Tooltip, Button } from "antd";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import AddProgress from "./Modal/AddProgress";
import EditProgress from "./Modal/EditProgress";

const data = [
  {
    id: 1,
    title: "Test 1",
  },
  {
    id: 2,
    title: "Test 2",
  },
];
const ProgressTestDetailComponent = () => {
  const handleDelete = (item) => {
    console.log(item);
    message.success("Click on Yes");
  };

  return (
    <Card
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Review 1
          <AddProgress />
        </div>
      }
      type="inner"
    >
      <List
        itemLayout="horizontal"
        grid={{ gutter: 16, column: 1 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Link to={`${window.location.pathname}/test/${item.id}`}>
                    {item.title}
                  </Link>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Tooltip title="Delete">
                      <Popconfirm
                        placement="left"
                        title="Are you sure to delete this Exercise?"
                        onConfirm={() => handleDelete(item.id)} //Handle disable logic here
                        okText="Yes"
                        cancelText="No"
                        icon={
                          <QuestionCircleOutlined style={{ color: "red" }} />
                        }
                      >
                        <Button
                          type="danger"
                          icon={<DeleteOutlined />}
                          style={{ marginRight: 5 }}
                        />
                      </Popconfirm>
                    </Tooltip>
                    <EditProgress data={item} />
                  </div>
                </div>
              }
            >
              Test descriptions
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ProgressTestDetailComponent;
