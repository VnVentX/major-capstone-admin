import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  List,
  AutoComplete,
  Input,
  Popconfirm,
  Button,
  Tooltip,
  message,
  Spin,
} from "antd";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import AddNewSubject from "./Modal/AddNewSubject";
import EditSubject from "./Modal/EditSubject";

const Subject = (props) => {
  const [subject, setSubject] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSubjectByGrade = async (gradeID) => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/grade/${gradeID}/subjects`)
      .then((res) => {
        setSubject(res.data.length === 0 ? [] : res.data);
        setSearchData(res.data.length === 0 ? [] : res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const deleteSubject = async (subjectID) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("id", subjectID);
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/subject/delete/${subjectID}`,
        formData
      )
      .then((res) => {
        console.log(res);
        getSubjectByGrade(props.gradeID);
        setLoading(false);
        message.success("Delete Subject successfully!");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        message.error("Fail to delete this Subject!");
      });
  };

  useEffect(() => {
    getSubjectByGrade(props.gradeID);
  }, [props.gradeID]);

  const handleDelete = (item) => {
    deleteSubject(item);
  };

  return (
    <Card type="inner" title="Subjects">
      {loading === true ? (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div
            style={{
              marginBottom: 20,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <AutoComplete>
              <Input.Search
                allowClear
                placeholder="Search Subject"
                onSearch={(subjectSearch) =>
                  setSubject(
                    searchData?.filter((item) =>
                      item.subjectName
                        .toString()
                        .toLowerCase()
                        .includes(subjectSearch.toLowerCase())
                    )
                  )
                }
                enterButton
              />
            </AutoComplete>
            <AddNewSubject
              gradeID={props.gradeID}
              getSubjectByGrade={getSubjectByGrade}
              getAllSubject={props.getAllSubject}
            />
          </div>
          {subject && (
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={subject}
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
                        <Link to={`${window.location.pathname}/${item.id}`}>
                          {item.subjectName}
                        </Link>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <EditSubject
                            gradeID={props.gradeID}
                            subjectID={item.id}
                            getSubjectByGrade={getSubjectByGrade}
                            getAllSubject={props.getAllSubject}
                          />
                          <Tooltip title="Delete">
                            <Popconfirm
                              placement="left"
                              title={
                                <span>
                                  Are you sure to delete this Subject?
                                  <br />
                                  (This action will remove everything
                                  <br />
                                  inside this Subject.)
                                </span>
                              }
                              onConfirm={() => handleDelete(item.id)} //Handle disable logic here
                              okText="Yes"
                              cancelText="No"
                              icon={
                                <QuestionCircleOutlined
                                  style={{ color: "red" }}
                                />
                              }
                            >
                              <Button
                                type="danger"
                                icon={<DeleteOutlined />}
                                style={{ marginLeft: 5 }}
                              />
                            </Popconfirm>
                          </Tooltip>
                        </div>
                      </div>
                    }
                  >
                    {item.description}
                  </Card>
                </List.Item>
              )}
            />
          )}
        </>
      )}
    </Card>
  );
};

export default Subject;
