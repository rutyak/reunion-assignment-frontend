import React from "react";

import {
  flexRender,
} from "@tanstack/react-table";
import {
  TableCell,
  TableRow,
  Box,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const SubRow = ({subRow, groupByColumn}) => {
  return (
    <TableRow key={subRow.id} sx={{ backgroundColor: "#f9f9f9" }}>
      {subRow.getVisibleCells().map((cell) => (
        <>
          {cell.column.id !== groupByColumn ? (
            <TableCell
              key={cell.id}
              sx={{ padding: "10px", textAlign: "center" }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <KeyboardArrowRightIcon sx={{ pt: "5px", color: "lightgray" }} />
            </Box>
          )}
        </>
      ))}
    </TableRow>
  );
};

export default SubRow;
