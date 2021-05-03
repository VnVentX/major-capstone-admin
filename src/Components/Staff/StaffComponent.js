import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Table, Tag, Space, Popconfirm, Button, message } from "antd";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { getJwt } from "../../helper/jwt";
import CreateStaff from "./Modal/CreateStaff";
import EditStaff from "./Modal/EditStaff";

const { TabPane } = Tabs;

export const StaffComponent = () => {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState([]);
  const [searchRecord, setSearchRecord] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    getAllStaff();
  }, []);

  const getAllStaff = async () => {
    setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/account/staff`, {
        headers: {
          Authorization: await getJwt(),
        },
      })
      .then((res) => {
        console.log(res.data);
        setRecord(res.data.length === 0 ? [] : res.data);
        setSearchRecord(res.data.length === 0 ? [] : res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const handleDisableStaff = (e, status) => {
    let message = "";
    if (status === "DELETED") {
      message = "DELETED";
    } else if (status === "ACTIVE") {
      message = "INACTIVE";
    } else if (status === "INACTIVE") {
      message = "ACTIVE";
    }
    disableStaff(e, message);
  };

  const disableStaff = async (id, status) => {
    setLoading(true);
    let ids = [];
    if (id.length === undefined) {
      ids.push(id);
    } else {
      ids = id;
    }
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/account/`,
        {
          ids: ids,
          status: status,
        },
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        console.log(res);
        getAllStaff();
        setLoading(true);
        if (status === "DELETED") {
          message.success("Delete staff successfully!");
        } else if (status === "ACTIVE" || status === "INACTIVE") {
          message.success("Change status successfully!");
        }
      })
      .catch((e) => {
        console.log(e);
        if (e.response?.data === "CANNOT DELETE") {
          message.error("Can not delete ative staff!");
        } else if (status === "ACTIVE" || status === "INACTIVE") {
          message.error("Fail to change status");
        }
        setLoading(false);
      });
  };

  const handleNameSearch = (name) => {
    setRecord(
      searchRecord?.filter(
        (item) =>
          item.fullName.toString().toLowerCase().includes(name.toLowerCase()) ||
          item.username.toString().toLowerCase().includes(name.toLowerCase())
      )
    );
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Account",
      dataIndex: "username",
    },
    {
      title: "Role",
      align: "center",
      dataIndex: "role",
      render: (role) => (
        <span>
          {role === "admin" ? (
            <Tag color={"volcano"} key={role}>
              ADMIN
            </Tag>
          ) : role === "staff" ? (
            <Tag color={"gold"} key={role}>
              STAFF
            </Tag>
          ) : null}
        </span>
      ),
    },
    {
      title: "Status",
      align: "center",
      dataIndex: "status",
      render: (status) => (
        <span>
          {status === "ACTIVE" ? (
            <Tag color={"green"} key={status}>
              Active
            </Tag>
          ) : status === "INACTIVE" ? (
            <Tag color={"volcano"} key={status}>
              Disabled
            </Tag>
          ) : null}
        </span>
      ),
    },
    {
      title: "Action",
      align: "center",
      render: (record) => (
        <Space size="small">
          <Popconfirm
            placement="topRight"
            title={
              record.status === "ACTIVE"
                ? "Are you sure to disable this Staff?"
                : "Are you sure to active this Staff?"
            }
            onConfirm={() => handleDisableStaff(record.id, record.status)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Change Status</Button>
          </Popconfirm>
          <EditStaff id={record.id} getAllStaff={getAllStaff} />
        </Space>
      ),
    },
  ];
  const onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total) => {
      return `Total Staffs: ${total}`;
    },
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Staff's Account" key="1">
        <div style={{ float: "right" }}>
          <CreateStaff getAllStaff={getAllStaff} />
        </div>
        <Table
          rowKey={(record) => record.id}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={record}
          scroll={{ x: true }}
          pagination={paginationProps}
          loading={loading}
        />
        <div>
          <h1>With selected:</h1>
          {selectedRowKeys.length === 0 ? (
            <>
              <Button type="danger" disabled icon={<DeleteOutlined />}>
                Delete
              </Button>
            </>
          ) : (
            <>
              <Popconfirm
                placement="topRight"
                title={<span>Are you sure to delete selected staffs?</span>}
                onConfirm={() => handleDisableStaff(selectedRowKeys, "DELETED")} //Handle disable logic here
                okText="Yes"
                cancelText="No"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              >
                <Button type="danger" icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            </>
          )}
        </div>
      </TabPane>
    </Tabs>
  );
};

export default StaffComponent;
