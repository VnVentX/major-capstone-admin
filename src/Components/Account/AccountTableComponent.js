import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
import { useLocation } from "react-router-dom";
import StudentAccountComponent from "./StundentAccountComponent";
import SearchFilter from "./Filter/SearchFilter";

const { TabPane } = Tabs;

export const AccountTableComponent = () => {
  const location = useLocation();
  const [record, setRecord] = useState([]);
  const [searchRecord, setSearchRecord] = useState([]);
  const [searchData, setSearchData] = useState();

  useEffect(() => {
    if (location.state === undefined) {
      return;
    } else {
      setSearchData({
        school: location.state.schoolID,
        grade: location.state.gradeID,
        class: location.state.classID,
      });
      handleSearch({
        school: location.state.schoolID,
        grade: location.state.gradeID,
        class: location.state.classID,
      });
    }
  }, []);

  const searchStudent = async (schoolID, gradeID, classID) => {
    await axios
      .post("https://mathscienceeducation.herokuapp.com/student/all", [
        schoolID,
        gradeID,
        classID,
      ])
      .then((res) => {
        console.log(res.data);
        setRecord(res.data.length === 0 ? [] : res.data);
        setSearchRecord(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSearch = (data) => {
    setSearchData(data);
    searchStudent(data.school, data.grade, data.class);
  };

  const handleNameSearch = (name) => {
    setRecord(
      searchRecord?.filter((item) =>
        (item.firstName + " " + item.lastName)
          .toString()
          .toLowerCase()
          .includes(name.toLowerCase())
      )
    );
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Student's Account" key="1">
        <SearchFilter
          listClass={data}
          searchData={searchData}
          handleSearch={handleSearch}
        />
        <StudentAccountComponent
          handleNameSearch={handleNameSearch}
          data={record}
          searchRecord={searchRecord}
          searchData={searchData}
        />
      </TabPane>
    </Tabs>
  );
};

export default AccountTableComponent;
