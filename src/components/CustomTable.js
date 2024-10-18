import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Box,
  Paper,
  TableCell,
  TableRow,
  TableSortLabel,
  styled,
} from "@mui/material";
import CustomPagination from "./CustomPagination";
import GroupedRow from "./tableRows/GroupedRow";
import Loading from "./Loading";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import SubRow from "../components/tableRows/SubRow";
const Base_url = process.env.REACT_APP_BACKEND_URL;

const StyledSwapVertIcon = styled(SwapVertIcon)(({ active }) => ({
  color: active ? "#1976d2" : "gray",
}));

const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "subcategory", header: "Subcategory" },
  { accessorKey: "createdAt", header: "Created At"},
  { accessorKey: "updatedAt", header: "Updated At" },
  { accessorKey: "price", header: "Price" },
  {
    accessorKey: "sale_price",
    header: "Sale Price",
    cell: ({ row }) => row.original.sale_price ?? "N/A",
  },
];

const CustomTable = ({
  search,
  setSearch,
  selectedColumns,
  showFilteredColumn,
  groupByColumn,
  setSorting,
  sorting,
  setFilters,
  filters,
}) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [grouping, setGrouping] = useState([]);

  useEffect(() => {
    if (groupByColumn) {
      setGrouping([groupByColumn]);
    } else {
      setGrouping([]);
    }
  }, [groupByColumn]);

  const filteredColumn = columns.filter(
    (column) => selectedColumns[column.accessorKey]
  );

  const handleGlobalFilterChange = (newValue) => {
    if (typeof newValue === 'string') {
      setSearch(newValue);
    } else {
      setFilters(newValue);
    }
  };
  
  const getGlobalFilterString = () => {
    const filterEntries = Object.values(filters) 
      .map(value => {
        if (Array.isArray(value)) {
          return value.join(", "); 
        }
        return value;
      })
      .join(", ");
    
    console.log("filterEntries in table: ", filterEntries); 

    return search ? search : filterEntries;
  };
  
  const table = useReactTable({
    data: fetchedData,
    columns: showFilteredColumn ? filteredColumn : columns,
    state: {
      sorting,
      grouping,
      globalFilter: getGlobalFilterString() || null,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    onGlobalFilterChange: handleGlobalFilterChange, 
  });
  

  console.log("filters in table: ", filters);
  console.log("filters in search: ", search);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${Base_url}/alldata`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setFetchedData(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px" }}>
      <TableContainer component={Paper} sx={{ mb: 5 }}>
        <Table stickyHeader aria-label="sortable table" sx={{ margin: "auto" }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup?.id} className="heade-table">
                {headerGroup?.headers?.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      fontWeight: "bold",
                      padding: "12px",
                      paddingLeft: "20px",
                      backgroundColor: "#f5f5f5",
                      borderBottom: "2px solid #e0e0e0",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      textAlign: "center",
                      width: header.id === groupByColumn ? "270px" : "auto",
                    }}
                  >
                    {header.column.getCanSort() ? (
                      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <TableSortLabel
                          active={!!header?.column?.getIsSorted()}
                          direction={header?.column?.getIsSorted() === "desc" ? "desc" : "asc"}
                          onClick={header.column.getToggleSortingHandler()}
                          IconComponent={() => (
                            header.id !== groupByColumn ? (
                              <StyledSwapVertIcon active={!!header?.column?.getIsSorted()} />
                            ) : (
                              <ArrowDownwardIcon sx={{ color: "lightgray" }} />
                            )
                          )}
                        >
                          {flexRender(header?.column?.columnDef?.header, header?.getContext())}
                        </TableSortLabel>
                        {header.id === groupByColumn && (
                          <KeyboardDoubleArrowRightIcon sx={{ ml: "130px" }} />
                        )}
                      </Box>
                    ) : (
                      flexRender(header?.column?.columnDef?.header, header?.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {loading ? (
              <Loading columns={columns} />
            ) : (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <GroupedRow row={row} columns={columns} groupByColumn={groupByColumn} />
                  {row.getIsExpanded() &&
                    row.subRows.map((subRow) => (
                      <SubRow subRow={subRow} groupByColumn={groupByColumn}/>
                    ))}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination table={table} />
    </Box>
  );
};

export default CustomTable;
