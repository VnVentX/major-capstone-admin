import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Table } from "antd";
import { useLocation } from "react-router-dom";
import { getJwt } from "../../helper/jwt";

const { TabPane } = Tabs;

export const StaffComponent = () => {
  const [record, setRecord] = useState([]);
  const [searchRecord, setSearchRecord] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleSelectChange = (values) => {
    setSelectedRowKeys(values);
  };

  const handleNameSearch = (name) => {
    setRecord(
      searchRecord?.filter(
        (item) =>
          item.fullName.toString().toLowerCase().includes(name.toLowerCase()) ||
          item.studentId.toString().toLowerCase().includes(name.toLowerCase())
      )
    );
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Staff's Account" key="1">
        <Table
        //   rowKey={(record) => record.id}
        //   rowSelection={rowSelection}
        //   columns={columns}
        //   dataSource={this.props.data}
        //   scroll={{ x: true }}
        //   pagination={paginationProps}
        //   loading={loading || this.props.loading}
        />
      </TabPane>
    </Tabs>
  );
};

export default StaffComponent;
