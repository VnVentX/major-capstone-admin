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
                HCM_12_M_G1_04
              </Descriptions.Item>
              <Descriptions.Item
                label="Site"
                labelStyle={{ fontWeight: "bold" }}
              >
                HCM
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
                span={2}
              >
                No. 18, Nguyen Kim Street, District 10, HCMC
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
                TH Major
              </Descriptions.Item>
              <Descriptions.Item
                label="Grade"
                labelStyle={{ fontWeight: "bold" }}
              >
                1
              </Descriptions.Item>
              <Descriptions.Item
                label="Class"
                labelStyle={{ fontWeight: "bold" }}
              >
                1-1
              </Descriptions.Item>
              <Descriptions.Item
                label="Start Date"
                labelStyle={{ fontWeight: "bold" }}
              >
                1/1/2021
              </Descriptions.Item>
              <Descriptions.Item
                label="End Date"
                labelStyle={{ fontWeight: "bold" }}
              ></Descriptions.Item>
              <Descriptions.Item
                label="Address"
                labelStyle={{ fontWeight: "bold" }}
                span={2}
              >
                No. 18, Phan Huy Ich Street, Go Vap District, HCMC
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </TabPane>
        <TabPane tab="Contacts" key="3">
          <Card>
            <Descriptions layout="vertical">
              <Descriptions.Item
                label="Farther Name"
                labelStyle={{ fontWeight: "bold" }}
              >
                Trần Thiên A
              </Descriptions.Item>
              <Descriptions.Item
                label="Morther Name"
                labelStyle={{ fontWeight: "bold" }}
              >
                Trần Thiên B
              </Descriptions.Item>
              <Descriptions.Item
                label="Telephone"
                labelStyle={{ fontWeight: "bold" }}
              >
                1810000000, 1810000001
              </Descriptions.Item>
              <Descriptions.Item
                label="Address"
                labelStyle={{ fontWeight: "bold" }}
                span={2}
              >
                No. 18, Nguyen Kim Street, District 10, HCMC
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </TabPane>
      </Tabs>
    </>
  );
};

export default AccountDetailComponent;
