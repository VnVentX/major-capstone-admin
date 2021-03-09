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
                label="Address"
                labelStyle={{ fontWeight: "bold" }}
              >
                No. 18, Nguyen Kim Street, District 10, HCMC
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
        <TabPane tab="School" key="2">
          <Card>
            <Descriptions layout="vertical">
              <Descriptions.Item
                label="School"
                labelStyle={{ fontWeight: "bold" }}
              >
                Dương Minh Châu
              </Descriptions.Item>
              <Descriptions.Item
                label="Education Level"
                labelStyle={{ fontWeight: "bold" }}
              >
                Primary School
              </Descriptions.Item>
              <Descriptions.Item
                label="Linked Date"
                labelStyle={{ fontWeight: "bold" }}
              >
                1/1/2021
              </Descriptions.Item>
              <Descriptions.Item
                label="Address"
                labelStyle={{ fontWeight: "bold" }}
                span={2}
              >
                No. 34, Nguyen Lam Street, Ward 6, District 10, HMC
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </TabPane>
      </Tabs>
    </>
  );
};

export default AccountDetailComponent;
