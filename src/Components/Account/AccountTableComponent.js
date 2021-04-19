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
  const [loading, setLoading] = useState(false);

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
    if (schoolID === undefined || schoolID === null) {
      schoolID = 0;
    }
    if (gradeID === undefined || gradeID === null) {
      gradeID = 0;
    }
    if (classID === undefined || classID === null) {
      classID = 0;
    }
    setLoading(true);
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
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const handleSearch = (data) => {
    setSearchData(data);
    searchStudent(data.school, data.grade, data.class);
  };

  const handleNameSearch = (name) => {
    setRecord(
      searchRecord?.filter(
        (item) =>
          item.fullName.toString().toLowerCase().includes(name.toLowerCase()) ||
          item.username.toString().toLowerCase().includes(name.toLowerCase())
      )
    );
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Student's Account" key="1">
        <SearchFilter
          searchData={searchData}
          handleSearch={handleSearch}
          loading={loading}
        />
        <StudentAccountComponent
          handleSearch={handleSearch}
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
