import React, { useEffect } from "react";
import { Form, Row, Col, Input, Button, AutoComplete, Select } from "antd";

const SearchFilter = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      school: props.searchData?.school,
      grade: props.searchData?.grade,
      class: props.searchData?.class,
    });
  });

  const onFinish = (values) => {
    props.handleSearch(values);
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
      style={{ marginBottom: 20 }}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name="school" label="Search School">
            <AutoComplete
              dataSource={props.listSchool?.map((item, idx) => (
                <Select.Option key={idx} value={item?.school}>
                  Trường Tiểu Học {item?.school}
                </Select.Option>
              ))}
            >
              <Input placeholder="Choose a School" allowClear />
            </AutoComplete>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="grade" label="Search Grade">
            <AutoComplete
              dataSource={props.listGrade?.map((item, idx) => (
                <Select.Option key={idx} value={item?.grade}>
                  {item?.grade}
                </Select.Option>
              ))}
            >
              <Input placeholder="Choose a Grade" allowClear />
            </AutoComplete>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="class" label="Search Class">
            <AutoComplete
              dataSource={props.listClass?.map((item, idx) => (
                <Select.Option key={idx} value={item?.class}>
                  {item?.class}
                </Select.Option>
              ))}
            >
              <Input placeholder="Choose a Class" allowClear />
            </AutoComplete>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchFilter;
