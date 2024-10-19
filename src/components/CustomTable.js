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
  selectedColumns,
  showFilteredColumn,
  groupByColumn,
  sorting,
  setSorting,
  filters,
}) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [grouping, setGrouping] = useState([]);

  useEffect(() => {
    if (groupByColumn) {
      setGrouping([groupByColumn]);
    } else {
      setGrouping([]);
    }
  }, [groupByColumn]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`${Base_url}/alldata`);
        const data = await res.json();
        let filteredData = data.data;

        if (filters) {
          if (filters.name) {
            filteredData = filteredData.filter(item =>
              item.name.toLowerCase().includes(filters.name.toLowerCase())
            );
          }
          if (filters.category.length > 0) {
            filteredData = filteredData.filter(item =>
              filters.category.includes(item.category)
            );
          }
          if (filters.subcategory.length > 0) {
            filteredData = filteredData.filter(item =>
              filters.subcategory.includes(item.subcategory)
            );
          }
          if (filters.createdAt[0] && filters.createdAt[1]) {
            filteredData = filteredData.filter(item => {
              const createdAt = new Date(item.createdAt);
              return createdAt >= filters.createdAt[0] && createdAt <= filters.createdAt[1];
            });
          }
          if (filters.price) {
            filteredData = filteredData.filter(item =>
              item.price >= filters.price[0] && item.price <= filters.price[1]
            );
          }
        }

        setTableData(filteredData);
      } catch (error) {
        console.error("Error fetching or filtering data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [filters]);

  const table = useReactTable({
    data: tableData,
    columns: showFilteredColumn ? columns.filter(column => selectedColumns[column.accessorKey]) : columns,
    state: {
      sorting,
      grouping,
      globalFilter: search,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
  });

  return (
    <Box sx={{ padding: "10px" }}>
      <TableContainer component={Paper} sx={{ mb: 5, overflowX: "auto" }}>
        <Table stickyHeader aria-label="sortable table" sx={{ margin: "auto", minWidth: 600 }}>
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <HeaderRow key={headerGroup.id} headerGroup={headerGroup} groupByColumn={groupByColumn} />
            ))}
          </TableHead>
          <TableBody>
            {loading ? (
              <Loading columns={columns} />
            ) : (
              table.getRowModel().rows.map(row => (
                <React.Fragment key={row.id}>
                  <GroupedRow row={row} columns={columns} groupByColumn={groupByColumn} />
                  {row.getIsExpanded() &&
                    row.subRows.map(subRow => (
                      <SubRow key={subRow.id} subRow={subRow} groupByColumn={groupByColumn} />
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
