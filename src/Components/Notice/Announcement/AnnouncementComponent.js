import React from "react";
import axios from "axios";
import {
  Table,
  Button,
  Input,
  Space,
  Popconfirm,
  message,
  AutoComplete,
  Select,
} from "antd";
import AddNewAnnouncement from "./Modal/AddNewAnnouncement";
import ViewAnnouncement from "./Modal/ViewAnnouncement";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";

export default class AnnouncementComponent extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    selectedRowKeys: [],
    dataSource: [],
    dataSearch: [],
  };

  componentDidMount() {
    this.getAllNews();
  }

  getAllNews = async () => {
    await axios
      .get(
        "https://mathscienceeducation.herokuapp.com/news/all?isStudent=false"
      )
      .then((res) => {
        this.setState({
          dataSource: res.data.length === 0 ? [] : res.data,
          dataSearch: res.data.length === 0 ? [] : res.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  deleteNews = async (id) => {
    let ids = [];
    if (id.length === undefined) {
      ids.push(id);
    } else {
      ids = id;
    }
    await axios
      .put("https://mathscienceeducation.herokuapp.com/news", ids)
      .then((res) => {
        console.log(res);
        this.getAllNews();
        message.success("Delete News successfully!");
      })
      .catch((e) => {
        console.log(e);
        message.error("Fail to delete News!");
      });
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  handleDelete = (e) => {
    console.log(e);
    this.deleteNews(e);
  };

  render() {
    const columns = [
      {
        title: "Title",
        width: "40%",
        dataIndex: "newsTitle",
      },
      {
        title: "Uploaded By",
        dataIndex: "createdBy",
      },
      {
        title: "Uploaded Date",
        dataIndex: "createdDate",
      },
      {
        title: "Action",
        align: "center",
        render: (record) => (
          <Space size="small">
            <ViewAnnouncement id={record.id} />
            <Popconfirm
              placement="topRight"
              title="Are you sure to delete this news?"
              onConfirm={() => this.handleDelete(record.id)} //Handle disable logic here
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button type="danger" icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];

    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <AutoComplete
            dataSource={this.state.dataSearch?.map((item, idx) => (
              <Select.Option key={idx} value={item.newsTitle}>
                {item.newsTitle}
              </Select.Option>
            ))}
          >
            <Input.Search
              placeholder="Search News"
              allowClear
              onSearch={(newsSearch) =>
                this.setState({
                  dataSource: this.state.dataSearch?.filter((item) =>
                    item.newsTitle
                      .toString()
                      .toLowerCase()
                      .includes(newsSearch.toLowerCase())
                  ),
                })
              }
              enterButton
            />
          </AutoComplete>
          <AddNewAnnouncement getAllNews={this.getAllNews} />
        </div>
        <Table
          rowKey={(record) => record.id}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.dataSource}
          scroll={{ x: true }}
        />
        <div>
          <h1>With selected:</h1>
          {selectedRowKeys.length === 0 ? (
            <>
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                disabled
                style={{ marginRight: 10 }}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Popconfirm
                placement="topRight"
                title="Are you sure to delete selected News?"
                onConfirm={() => this.handleDelete(this.state.selectedRowKeys)} //Handle disable logic here
                okText="Yes"
                cancelText="No"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              >
                <Button
                  type="danger"
                  icon={<DeleteOutlined />}
                  style={{ marginRight: 10 }}
                >
                  Delete
                </Button>
              </Popconfirm>
            </>
          )}
        </div>
      </div>
    );
  }
}
