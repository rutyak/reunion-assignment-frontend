import { AppBar, Toolbar, Typography, Container, Box, CssBaseline } from "@mui/material";
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
    <Container maxWidth="xl" sx={{ bgcolor: 'lightgray'}}>
      <CssBaseline />
      <AppBar position="static" sx={{ bgcolor: '#001f3f' }}> 
        <Toolbar>
          <Typography variant="h6">My Application</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 1, bgcolor: '#f5f5f5', p: 2.1, boxShadow: 2}}>
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
          selectedColumns={selectedColumns}
          showFilteredColumn={showFilteredColumn}
          groupByColumn={groupByColumn}
          setSorting={setSorting}
          sorting={sorting}
          filters={showAllFilteredData ? filters : null}
        />
      </Box>
    </Container>
  );
}

export default App;
