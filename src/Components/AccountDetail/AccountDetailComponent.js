import React from "react";
import { Tabs, Card, Descriptions } from "antd";
const { TabPane } = Tabs;

const AccountDetailComponent = () => {
  return (
    <>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Personal" key="1">
          <Card>
            <Descriptions layout="vertical">
              <Descriptions.Item
                label="Full Name"
                labelStyle={{ fontWeight: "bold" }}
              >
                Trần Thiên Anh
              </Descriptions.Item>
              <Descriptions.Item
                label="Account"
                labelStyle={{ fontWeight: "bold" }}
              >
                HDMC_G1_04
              </Descriptions.Item>
              <Descriptions.Item
                label="DOB"
                labelStyle={{ fontWeight: "bold" }}
              >
                1998/06/11
              </Descriptions.Item>
              <Descriptions.Item
                label="Parent Name"
                labelStyle={{ fontWeight: "bold" }}
              >
                Tran Minh Thanh
              </Descriptions.Item>
              <Descriptions.Item
                label="Telephone"
                labelStyle={{ fontWeight: "bold" }}
              >
                1810000000
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </TabPane>
      </Tabs>
    </>
  );
};

export default AccountDetailComponent;
