import React from "react";
import { useRecords } from "../RecordsContext";

function Search() {
  const {
    patients,
    selectedPatientId,
    setSelectedPatientId,
    setActivePatientId 
  } = useRecords();

  return (
    <div className="layout-row align-items-baseline select-form-container">
      <div className="select">
        <select
          data-testid="patient-name" 
          value={selectedPatientId}
          onChange={(e)=> setSelectedPatientId(e.target.value)}>
          <option value="0" disabled>
            Select Patient
          </option>
          {
            patients.map((p)=>(
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
          ))}
        </select>
      </div>

      <button type="submit" data-testid="show" onClick={setActivePatientId(selectedPatientId)}>
        Show
      </button>
    </div>
  );
}

export default Search;
