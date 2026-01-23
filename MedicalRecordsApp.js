import React, {useState} from "react";
import "./App.css";
import "h8k-components";
import { RecordsProvider } from "./RecordsContext";
import Search from "./components/Search";
import Records from "./components/Records";
import medical_records from "./medicalRecords";

const title = "Patient Medical Records";

const App = () => {
  return (
    <RecordsProvider records={medical_records}>
      <div className="App">
        <h8k-navbar header={title}></h8k-navbar>
        <div className="content">
          <Search />
          <Records />
        </div>
      </div>
    </RecordsProvider>
  );
};

export default App;
