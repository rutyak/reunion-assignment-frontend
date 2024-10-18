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

  const initialFilterState = {
    name: "",
    category: [],
    subcategory: [],
    createdAt: [null, null],
    updatedAt: [null, null],
    price: [11, 100],
    saleprice: [11, 100],
  };
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(initialFilterState);
  const [showAllFilteredData, setShowAllFilteredData] = useState(false);
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
        setFilters={setFilters}
        filters={filters}
        setShowAllFilteredData={setShowAllFilteredData}
      />
      <CustomTable
        search={search}
        setSearch={setSearch}
        selectedColumns={selectedColumns}
        showFilteredColumn={showFilteredColumn}
        groupByColumn={groupByColumn}
        setSorting={setSorting}
        sorting={sorting}
        setFilters={setFilters}
        filters={showAllFilteredData? filters: ""}
      />
    </div>
  );
}

export default App;
