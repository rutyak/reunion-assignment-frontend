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

  return (
    <div className="App">
      <Navbar
        setSearch={setSearch}
        search={search}
        setSelectedColumns={setSelectedColumns}
        selectedColumns={selectedColumns}
        setShowFilteredColumn={setShowFilteredColumn}
        showFilteredColumn={showFilteredColumn}
      />
      <CustomTable
        search={search}
        selectedColumns={selectedColumns}
        showFilteredColumn={showFilteredColumn}
      />
    </div>
  );
}

export default App;
