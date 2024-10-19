import React from "react";
import { flexRender } from "@tanstack/react-table";
import { TableCell, TableRow, Box } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const SubRow = ({ subRow, groupByColumn }) => {
  return (
    <TableRow key={subRow.id} sx={{ backgroundColor: "#f9f9f9" }}>
      {subRow.getVisibleCells().map((cell) => (
        <React.Fragment key={cell.id}>
          {cell.column.id !== groupByColumn ? (
            <TableCell
              sx={{
                padding: { xs: "8px", sm: "10px", md: "12px" }, 
                textAlign: "center",
                fontSize: { xs: "10px", sm: "12px", md: "14px" }, 
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ) : (
            <TableCell
              sx={{
                padding: { xs: "8px", sm: "10px", md: "12px" }, 
                fontSize: { xs: "10px", sm: "12px", md: "14px" }, 
                textAlign: "center",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <KeyboardArrowRightIcon
                  sx={{ pt: "5px", color: "lightgray", fontSize: { xs: "1rem", sm: "1.25rem" } }} 
                />
              </Box>
            </TableCell>
          )}
        </React.Fragment>
      ))}
    </TableRow>
  );
};

export default SubRow;
