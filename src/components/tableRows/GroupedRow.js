import React from "react";

import {
  flexRender,
} from "@tanstack/react-table";
import {
  TableCell,
  TableRow,
  Box,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const GroupedRow = ({row, columns, groupByColumn}) => {
  return (
      <TableRow key={row.id} sx={{ "&:hover": { backgroundColor: "#e3f2fd" } }}>
        {row.getIsGrouped() ? (
          <TableCell colSpan={columns.length}>
            <Button
              onClick={row.getToggleExpandedHandler()}
              sx={{
                width: "280px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                {row.original?.[groupByColumn]}({row.subRows.length})
              </Box>
              <Box>
                {row.getIsExpanded() ? (
                  <KeyboardArrowDownIcon sx={{ pt: "6px" }} />
                ) : (
                  <KeyboardArrowUpIcon sx={{ pt: "6px" }} />
                )}
              </Box>
            </Button>
          </TableCell>
        ) : (
          row.getVisibleCells().map((cell) => (
            <TableCell
              key={cell.id}
              sx={{
                padding: "10px",
                borderBottom: "1px solid #e0e0e0",
                textAlign: "center",
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))
        )}
      </TableRow>
  );
};

export default GroupedRow;
