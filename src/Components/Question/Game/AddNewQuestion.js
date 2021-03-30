import React, { useState } from "react";
import { Select, Row, Col } from "antd";
import MatchingQuestion from "./Form/MatchingQuestion";
import FillingQuestion from "./Form/FillingQuestion";
import SwappingQuestion from "./Form/SwappingQuestion";
import ChoosingQuestion from "./Form/ChoosingQuestion";

const { Option } = Select;

const AddNewQuestion = () => {
  const [type, setType] = useState("");

  return (
    <>
      <Row gutter={24}>
        <Col span={24}>
          <label>Select Question Type: </label>
          <Select
            placeholder="Select Question Type"
            onChange={(e) => setType(e)}
          >
            <Option value="FILL">Filling Question</Option>
            <Option value="MATCH">Matching Question</Option>
            <Option value="SWAP">Swapping Question</Option>
            <Option value="CHOOSE">Choosing Question</Option>
          </Select>
        </Col>
      </Row>
      {type === "MATCH" ? (
        <MatchingQuestion type={type} />
      ) : type === "FILL" ? (
        <FillingQuestion type={type} />
      ) : type === "SWAP" ? (
        <SwappingQuestion type={type} />
      ) : type === "CHOOSE" ? (
        <ChoosingQuestion type={type} />
      ) : null}
    </>
  );
};

export default AddNewQuestion;
