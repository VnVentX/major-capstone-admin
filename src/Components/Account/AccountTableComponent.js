import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
import { useLocation } from "react-router-dom";
import StudentAccountComponent from "./StundentAccountComponent";
import SearchFilter from "./Filter/SearchFilter";
import { getJwt } from "../../helper/jwt";

const { TabPane } = Tabs;

export const AccountTableComponent = () => {
  const location = useLocation();
  const [record, setRecord] = useState([]);
  const [searchRecord, setSearchRecord] = useState([]);
  const [gradeClassList, setGradeClassList] = useState([]);
  const [searchData, setSearchData] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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

  const handleSelectChange = (values) => {
    setSelectedRowKeys(values);
  };

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
      .post(
        `${process.env.REACT_APP_BASE_URL}/student/all`,
        [schoolID, gradeID, classID],
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        setRecord(res.data.length === 0 ? [] : res.data);
        setSearchRecord(res.data.length === 0 ? [] : res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const getGradeClassList = async (schoolID, gradeID, classID) => {
    if (schoolID === undefined || schoolID === null) {
      schoolID = 0;
    }
    if (gradeID === undefined || gradeID === null) {
      gradeID = 0;
    }
    if (classID === undefined || classID === null) {
      classID = 0;
    }
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/class/${schoolID}?classesId=${classID}&gradeId=${gradeID}&schoolId=${schoolID}`,
        {
          headers: {
            Authorization: getJwt(),
          },
        }
      )
      .then((res) => {
        setGradeClassList(res.data.length === 0 ? [] : res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSearch = (data) => {
    setSelectedRowKeys([]);
    setSearchData(data);
    searchStudent(data.school, data.grade, data.class);
    getGradeClassList(data.school, data.grade, data.class);
  };

  const handleNameSearch = (name) => {
    setRecord(
      searchRecord?.filter(
        (item) =>
          item.fullName.toString().toLowerCase().includes(name.toLowerCase()) ||
          item.studentId.toString().toLowerCase().includes(name.toLowerCase())
      )
    );
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Student" key="1">
        <SearchFilter
          searchData={searchData}
          handleSearch={handleSearch}
          loading={loading}
        />
        <StudentAccountComponent
          handleSearch={handleSearch}
          handleNameSearch={handleNameSearch}
          data={record}
          gradeClassList={gradeClassList}
          searchRecord={searchRecord}
          searchData={searchData}
          handleSelectChange={handleSelectChange}
          selectedRowKeys={selectedRowKeys}
          loading={loading}
        />
      </TabPane>
    </Tabs>
  );
};

export default AccountTableComponent;
