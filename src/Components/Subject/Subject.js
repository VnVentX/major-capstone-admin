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
} from "antd";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import AddNewSubject from "./Modal/AddNewSubject";
import EditSubject from "./Modal/EditSubject";

const Subject = (props) => {
  const [subject, setSubject] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const getSubjectByGrade = async (gradeID) => {
    await axios
      .get(
        `https://mathscienceeducation.herokuapp.com/grade/${gradeID}/subjects`
      )
      .then((res) => {
        setSubject(res.data.length === 0 ? [] : res.data);
        setSearchData(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteSubject = async (subjectID) => {
    let formData = new FormData();
    formData.append("id", subjectID);
    await axios
      .put(
        `https://mathscienceeducation.herokuapp.com/subject/delete/${subjectID}`,
        formData
      )
      .then((res) => {
        console.log(res);
        getSubjectByGrade(props.gradeID);
      })
      .catch((e) => {
        console.log(e);
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
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <AutoComplete dataSource={searchData?.map((item) => item.subjectName)}>
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
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Tooltip title="Delete">
                        <Popconfirm
                          placement="left"
                          title="Are you sure to delete this Subject?"
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
                      <EditSubject
                        data={item}
                        gradeID={props.gradeID}
                        getSubjectByGrade={getSubjectByGrade}
                      />
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
    </Card>
  );
};

export default Subject;
