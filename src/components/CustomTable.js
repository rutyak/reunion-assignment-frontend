import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getGroupedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Box,
  Paper,
} from "@mui/material";
import CustomPagination from "./CustomPagination";
import GroupedRow from "./tableRows/GroupedRow";
import Loading from "./Loading";
import SubRow from "../components/tableRows/SubRow";
import HeaderRow from "./tableRows/HeaderRow";

const Base_url = process.env.REACT_APP_BACKEND_URL;

const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "subcategory", header: "Subcategory" },
  { accessorKey: "createdAt", header: "Created At" },
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
    if (typeof newValue === "string") {
      setSearch(newValue);
    } else {
      setFilters(newValue);
    }
  };

  const getGlobalFilterString = () => {
    const filterEntries = Object.values(filters)
      .map((value) => {
        if (Array.isArray(value)) {
          return value.join(", ");
        }
        return value;
      })
      .join(", ");

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
    <Box sx={{ padding: "10px" }}>
      <TableContainer component={Paper} sx={{ mb: 5, overflowX: "auto" }}>
        <Table
          stickyHeader
          aria-label="sortable table"
          sx={{ margin: "auto", minWidth: 600 }}
        >
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <HeaderRow headerGroup={headerGroup} groupByColumn={groupByColumn}/>
            ))}
          </TableHead>
          <TableBody>
            {loading ? (
              <Loading columns={columns} />
            ) : (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <GroupedRow
                    row={row}
                    columns={columns}
                    groupByColumn={groupByColumn}
                  />
                  {row.getIsExpanded() &&
                    row.subRows.map((subRow) => (
                      <SubRow
                        key={subRow.id}
                        subRow={subRow}
                        groupByColumn={groupByColumn}
                      />
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
