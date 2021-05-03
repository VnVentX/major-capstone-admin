import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Table, Tag, Space, Popconfirm, Button } from "antd";
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
        setRecord(res.data.length === 0 ? [] : res.data);
        setSearchRecord(res.data.length === 0 ? [] : res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
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
          {status === "admin" ? (
            <Tag color={"volcano"} key={status}>
              Disabled
            </Tag>
          ) : status === "staff" ? (
            <Tag color={"green"} key={status}>
              Active
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
          <EditStaff id={record.id} getAllStaff={getAllStaff} />
        </Space>
      ),
    },
  ];
  const onSelectChange = (selectedRowKeys) => {
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
      return `Total Students: ${total}`;
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
      </TabPane>
    </Tabs>
  );
};

export default StaffComponent;
