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
import SubRow from "./tableRows/SubRow";
import HeaderRow from "./tableRows/HeaderRow";
import Loading from "./Loading";

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
}) => {
  const [sorting, setSorting] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(groupByColumn ? 3 : 10);
  const [loading, setLoading] = useState(false);
  const [grouping, setGrouping] = useState([]);
  const [allData, setAllData] = useState([]);

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

  const table = useReactTable({
    data: fetchedData,
    columns: showFilteredColumn ? filteredColumn : columns,
    state: { search, sorting, grouping },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
  });

  const getData = async (page = 0, limit, search = "") => {
    setLoading(true);
    try {
      const res = await fetch(
        `${Base_url}/data?page=${
          page + 1
        }&limit=${limit}&search=${encodeURIComponent(search)}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setFetchedData(data.data);
      setTotalCount(data.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  async function fetchAllData() {
    setLoading(true);
    try {
      const res = await fetch(`${Base_url}/alldata`);
      const data = await res.json();
      console.log("data: ", data.data);
      setAllData(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData(pageIndex, pageSize, search);
  }, [pageIndex, pageSize, search, groupByColumn]);

  useEffect(() => {
    if (groupByColumn) {
      fetchAllData();
    }
  }, [groupByColumn]);


  return (
    <Box sx={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px" }}>
      <TableContainer component={Paper} sx={{ mb: 5 }}>
        <Table
          stickyHeader
          aria-label="sortable table"
          sx={{
            // width:"95%",
            margin: "auto",
          }}
        >
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <HeaderRow headerGroup={headerGroup} groupByColumn={groupByColumn}/>
            ))}
          </TableHead>
          <TableBody>
            {loading ? (
              <Loading columns={columns}/>
            ) : (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <GroupedRow row={row} columns={columns} groupByColumn={groupByColumn}/>
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

      <CustomPagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={setPageIndex}
        onRowsPerPageChange={setPageSize}
      />
    </Box>
  );
};

export default CustomTable;
