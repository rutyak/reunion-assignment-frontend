import "./App.css";
import Navbar from "./components/Navbar";
import CustomTable from "./components/CustomTable";
import { useState } from "react";

function App() {
  const initialState = {
    category: true,
    createdAt: true,
    id: true,
    name: true,
    price: true,
    sale_price: true,
    subcategory: true,
    updatedAt: true,
  };
  const [search, setSearch] = useState("");
  const [selectedColumns, setSelectedColumns] = useState(initialState);
  const [showFilteredColumn, setShowFilteredColumn] = useState(false);
  const [groupByColumn, setGroupByColumn] = useState("");
  const [sorting, setSorting] = useState([]);

  return (
    <div className="App">
      <Navbar
        setSearch={setSearch}
        search={search}
        setSelectedColumns={setSelectedColumns}
        selectedColumns={selectedColumns}
        setShowFilteredColumn={setShowFilteredColumn}
        showFilteredColumn={showFilteredColumn}
        setGroupByColumn={setGroupByColumn}
        groupByColumn={groupByColumn}
        setSorting={setSorting}
        sorting={sorting}
      />
      <CustomTable
        search={search}
        selectedColumns={selectedColumns}
        showFilteredColumn={showFilteredColumn}
        groupByColumn={groupByColumn}
        setSorting={setSorting}
        sorting={sorting}
      />
    </div>
  );
}

export default App;
