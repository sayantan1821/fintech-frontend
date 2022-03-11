import "./App.css";
import DataService from "./services/DataService";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
function App() {
  const api = new DataService();
  const getDataById = () => {
    api.getRecordById(9684).then((res) => {
      console.log("Record by sl_no : ", res.data);
    });
  };
  const getDataByCustomerId = () => {
    api.getRecordByCustNumber("0200769623", 0, 10).then((res) => {
      console.log("Records by cust_number : ", res.data);
    });
  };
  const getAdvancedSearch = () => {
    api.advancedSearch("1930698352", "0200803720", 2020, 0, 10).then((res) => {
      console.log("Advanced Search Result : ", res.data);
    });
  };
  const pageWiseData = () => {
    api.recordsByPagination(0, 10).then((res) => {
      console.log("Records Per page : ", res.data);
    });
  };
  const recordData = {
    sl_no: 9685,
    business_code: "U001",
    cust_number: "0200561861",
    name_customer: "sayantan kapat 5",
    clear_date: "2020-05-11 11:20:09.0",
    buisness_year: 2020,
    doc_id: "1930797056",
    posting_date: "2020-04-21 00:00:00.0",
    due_in_date: "2020-04-21 00:00:00.0",
    baseline_create_date: "2020-04-21 00:00:00.0",
    cust_payment_terms: "okok",
    converted_usd: "1234.5",
    Aging_Bucket: "0-15",
  };
  const postData = () => {
    api.addRecord(recordData).then((res) => {
      console.log("New Data is : ", res.data);
    });
  };
  const updateData = () => {
    api.updateRecord(9685, "mnop", 18.21).then((res) => {
      console.log("After updating data : ", res.data);
    });
  };
  const deleteData = () => {
    api.deleteRecords("9681,9682,9683").then((res) => {
      console.log("Deleting Records : ");
      console.log(res.data);
    });
  };
  const getCount = () => {
    api.countRecord().then((res) => {
      console.log("Total no. of records are", res.data);
    });
  };
  useEffect(() => {
    // getDataById();
    // getDataByCustomerId();
    // getAdvancedSearch()
    // pageWiseData();
    // postData();
    // updateData();
    // deleteData();
    // getCount();
  });
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
