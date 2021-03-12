import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { useLocation } from "react-router-dom";
import StudentAccountComponent from "./StundentAccountComponent";

import SearchFilter from "./Filter/SearchFilter";

const { TabPane } = Tabs;

const student = [
  {
    id: 1,
    firstName: "Đoàn",
    lastName: "Tuấn Đức",
    school: "Duương Minh Châu",
    account: "DMC_G1_01",
    grade: 1,
    class: "1-1",
    gender: "male",
    status: "learning",
    email: "mockemail1@mockemail.com",
  },
  {
    id: 2,
    firstName: "Trương",
    lastName: "Thành Đạt",
    school: "Duương Minh Châu",
    account: "DMC_G1_02",
    grade: 1,
    class: "1-1",
    gender: "male",
    status: "learning",
    email: "mockemail1@mockemail.com",
  },
  {
    id: 3,
    firstName: "Từ",
    lastName: "Thiệu Hào",
    school: "Duương Minh Châu",
    account: "DMC_G1_03",
    grade: 1,
    class: "1-1",
    gender: "male",
    status: "learning",
    email: "mockemail1@mockemail.com",
  },
  {
    id: 4,
    firstName: "Trần",
    lastName: "Thiên Anh",
    school: "Duương Minh Châu",
    account: "DMC_G1_04",
    grade: 1,
    class: "1-1",
    gender: "male",
    status: "learning",
    email: "mockemail1@mockemail.com",
  },
];

const school = [
  {
    id: 1,
    school: "Dương Minh Châu",
  },
  {
    id: 2,
    school: "Nguyễn Chí Thanh",
  },
  {
    id: 3,
    school: "Nguyễn Văn Tố",
  },
  {
    id: 4,
    school: "Trần Quang Cơ",
  },
];

const grade = [
  {
    id: 1,
    grade: "Grade 1",
  },
  {
    id: 2,
    grade: "Grade 2",
  },
  {
    id: 3,
    grade: "Grade 3",
  },
  {
    id: 4,
    grade: "Grade 4",
  },
  {
    id: 5,
    grade: "Grade 5",
  },
];

const data = [
  {
    id: 1,
    class: "1-1",
  },
  {
    id: 2,
    class: "1-2",
  },
  {
    id: 3,
    class: "1-3",
  },
  {
    id: 4,
    class: "1-4",
  },
  {
    id: 5,
    class: "1-5",
  },
];

export const AccountTableComponent = () => {
  const location = useLocation();
  const [record, setRecord] = useState([]);

  useEffect(() => {
    if (location.state === undefined) {
      return;
    } else {
      handleSearch();
    }
  }, []);

  const handleSearch = (data) => {
    //! Nếu location.state === undefined thì sẽ search data bình thường
    if (location.state === undefined) {
      console.log("Searching without state: ", data);
      setRecord(student);
    } else {
      //! Còn không thì search data theo state
      data = {
        school: location.state.school,
        grade: location.state.grade,
        class: location.state.class,
      };
      console.log("Searching state: ", data);
      setRecord(student);
    }
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Student's Account" key="1">
        <SearchFilter
          listSchool={school}
          listGrade={grade}
          listClass={data}
          searchData={
            location.state === undefined
              ? {
                  school: "",
                  grade: "",
                  class: "",
                }
              : {
                  school: location.state.school,
                  grade: location.state.grade,
                  class: location.state.class,
                }
          }
          handleSearch={handleSearch}
        />
        <StudentAccountComponent data={record} />
      </TabPane>
    </Tabs>
  );
};

export default AccountTableComponent;
