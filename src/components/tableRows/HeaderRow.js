import React from "react";
import { flexRender } from "@tanstack/react-table";
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

const HeaderRow = ({ headerGroup, groupByColumn }) => {
  const StyledSwapVertIcon = styled(SwapVertIcon)(({ active }) => ({
    color: active ? "#1976d2" : "gray",
  }));

  return (
    <TableRow key={headerGroup?.id} className="header-table">
      {headerGroup?.headers?.map((header) => (
        <TableCell
          key={header.id}
          sx={{
            fontWeight: "bold",
            padding: { xs: "10px", sm: "12px", md: "15px" },
            paddingLeft: "20px",
            backgroundColor: "#f5f5f5",
            borderBottom: "2px solid #e0e0e0",
            position: "sticky",
            top: 0,
            zIndex: 1,
            textAlign: "center",
            width: header.id === groupByColumn ? "270px" : "auto",
            fontSize: { xs: "10px", sm: "12px", md: "14px" },
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {header.column.getCanSort() ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TableSortLabel
                active={!!header?.column?.getIsSorted()}
                direction={
                  header?.column?.getIsSorted() === "desc" ? "desc" : "asc"
                }
                onClick={header.column.getToggleSortingHandler()}
                IconComponent={() =>
                  header.id !== groupByColumn ? (
                    <StyledSwapVertIcon
                      active={!!header?.column?.getIsSorted()}
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.25rem", md: "1.35rem" },
                      }}
                    />
                  ) : (
                    <ArrowDownwardIcon
                      sx={{
                        color: "lightgray",
                        fontSize: { xs: "1rem", sm: "1.25rem", md: "1.35rem" },
                      }}
                    />
                  )
                }
              >
                {flexRender(
                  header?.column?.columnDef?.header,
                  header?.getContext()
                )}
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
  );
};

export default HeaderRow;
