import React from "react";

const RecordsContext = React.createContext(null);

export function RecordsProvider({ records, children }) {
  const [selectedPatientId, setSelectedPatientId] = React.useState("0");
  const [activePatientId, setActivePatientId] = React.useState("0"); // set on Show

  const patients = React.useMemo(() => {
    const map = new Map();
    (records ?? []).forEach((group) => {
      group.data.forEach((r) => map.set(String(r.userId), r.userName));
    });
    return Array.from(map, ([id, name]) => ({ id, name }));
  }, [records]);

  const filteredRecords = React.useMemo(() => {
    if (activePatientId === "0") return [];
    const group = (records ?? []).find((g) => String(g.id) === String(activePatientId));
    return group?.data ?? [];
  }, [records, activePatientId]);

  return (
    <RecordsContext.Provider
      value={{
        patients,
        selectedPatientId,
        setSelectedPatientId,
        activePatientId,
        setActivePatientId,
        filteredRecords,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
}

export function useRecords() {
  const ctx = React.useContext(RecordsContext);
  if (!ctx) throw new Error("useRecords must be used inside <RecordsProvider>");
  return ctx;
}
