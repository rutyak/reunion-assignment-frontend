import React from "react";

import {
  flexRender,
} from "@tanstack/react-table";
import {
  TableCell,
  TableRow,
  Box,
  TableSortLabel,
  styled,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const HeaderRow = ({headerGroup, groupByColumn}) =>{

    const StyledSwapVertIcon = styled(SwapVertIcon)(({ active }) => ({
        color: active ? "#1976d2" : "gray",
      }));

    return (
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: groupByColumn? "space-between": "center",
                  alignItems: "center",
                }}
              >
                <TableSortLabel
                  active={!!header?.column?.getIsSorted()}
                  direction={
                    header?.column?.getIsSorted() === "desc"
                      ? "desc"
                      : "asc"
                  }
                  onClick={header.column.getToggleSortingHandler()}
                  IconComponent={() =>
                    header.id !== groupByColumn ? (
                      <StyledSwapVertIcon
                        active={!!header?.column?.getIsSorted()}
                      />
                    ) : (
                      <ArrowDownwardIcon sx={{ color:"lightgray"}}/>
                    )
                  }
                >
                  {flexRender(
                    header?.column?.columnDef?.header,
                    header?.getContext()
                  )}
                </TableSortLabel>
                {header.id === groupByColumn && (
                  <KeyboardDoubleArrowRightIcon />
                )}
              </Box>
            ) : (
              flexRender(
                header?.column?.columnDef?.header,
                header?.getContext()
              )
            )}
          </TableCell>
        ))}
      </TableRow>
    )
}

export default HeaderRow;