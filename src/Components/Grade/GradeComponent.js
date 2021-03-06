import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, List } from "antd";
import { Link } from "react-router-dom";
import { getJwt } from "../../helper/jwt";

const GradeComponent = () => {
  const [grade, setGrade] = useState([]);

  useEffect(() => {
    getAllGrade();
  }, []);

  const getAllGrade = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/grade/all`, {
        headers: {
          Authorization: getJwt(),
        },
      })
      .then((res) => {
        setGrade(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Card type="inner" title="Choose a Grade">
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={grade}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={
                <Link to={`${window.location.pathname}/${item.id}`}>
                  Grade {item.gradeName}
                </Link>
              }
            ></Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default GradeComponent;
