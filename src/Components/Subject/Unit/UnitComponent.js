import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  List,
  AutoComplete,
  Input,
  Popconfirm,
  message,
  Tooltip,
  Button,
  Select,
} from "antd";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import AddNewUnit from "./Modal/AddNewUnit";
import EditUnit from "./Modal/EditUnit";
import { getJwt } from "../../../helper/jwt";

const { Search } = Input;

const UnitComponent = (props) => {
  const [unit, setUnit] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    getUnitBySubjectID();
  }, []);

  const getUnitBySubjectID = async () => {
    let subjectID = window.location.pathname.split("/")[2];
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/subject/${subjectID}/units`, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((res) => {
        setUnit(res.data.length === 0 ? [] : res.data);
        setSearchData(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteUnit = async (unitID) => {
    let formData = new FormData();
    formData.append("id", unitID);
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/unit/delete`, formData, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((res) => {
        console.log(res);
        getUnitBySubjectID();
        message.success("Delete Unit successfully");
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data === "CANNOT DELETE") {
          message.error(
            "Can not delete unit with active exercise or game, please check again!"
          );
        } else if (e.response.data === "Have progressTest LINKED!") {
          message.error(
            "Can not delete Unit linked with Progress Test, please check again!"
          );
        } else {
          message.error("Fail to delete Unit");
        }
      });
  };

  const handleDelete = (item) => {
    deleteUnit(item);
  };

  return (
    <Card type="inner" title="Unit">
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <AutoComplete>
          <Search
            allowClear
            placeholder="Search Unit"
            onSearch={(unitSearch) =>
              setUnit(
                searchData?.filter((item) =>
                  `Unit ${item.unitName}`
                    .toString()
                    .toLowerCase()
                    .includes(unitSearch.toLowerCase())
                )
              )
            }
            enterButton
          />
        </AutoComplete>
        <AddNewUnit
          getUnitBySubjectID={getUnitBySubjectID}
          getAllUnit={props.getAllUnit}
        />
      </div>

      {unit && (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={unit}
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
                    <Link to={`${window.location.pathname}/unit/${item.id}`}>
                      Unit {item.unitName}
                    </Link>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <EditUnit
                        data={item}
                        getUnitBySubjectID={getUnitBySubjectID}
                        getAllUnit={props.getAllUnit}
                      />
                      <Tooltip title="Delete">
                        <Popconfirm
                          placement="left"
                          title="Are you sure to delete this Unit?"
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
    </Card>
  );
};

export default UnitComponent;
