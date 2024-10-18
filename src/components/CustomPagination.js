import React from "react";
import { Box, Button } from "@mui/material";

const CustomPagination = ({ table }) => {
  const {
    getCanPreviousPage,
    getCanNextPage,
    previousPage,
    nextPage,
    setPageIndex,
    getPageCount,
    getState,
  } = table;

  const { pageIndex } = getState().pagination;
  const totalPages = getPageCount();

  const getDisplayedPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (pageIndex <= 2) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (pageIndex >= totalPages - 3) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", pageIndex + 1, pageIndex + 2, pageIndex + 3, "...", totalPages);
      }
    }
    return pages;
  };

  const displayedPages = getDisplayedPages();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
      }}
    >
      <Button
        onClick={() => previousPage()}
        disabled={!getCanPreviousPage()}
        sx={{
          minWidth: "40px",
          opacity: !getCanPreviousPage() ? 0.5 : 1,
          transition: "opacity 0.2s",
          '&:hover': {
            backgroundColor: getCanPreviousPage() && '#1976d2',
          },
        }}
      >
        {"<"}
      </Button>

      {displayedPages.map((page, index) => (
        <Button
          key={index}
          onClick={() => typeof page === 'number' && setPageIndex(page - 1)}
          variant={pageIndex === page - 1 ? "contained" : "outlined"}
          sx={{
            mx: 0.5,
            minWidth: "40px",
            cursor: page === "..." ? "default" : "pointer",
            pointerEvents: page === "..." ? "none" : "auto",
            backgroundColor: pageIndex === page - 1 ? "#1976d2" : "white",
            color: pageIndex === page - 1 ? "#fff" : "#000",
            '&:hover': {
              backgroundColor: page !== "..." ? "#1976d2" : "transparent",
              color: page !== "..." ? "#fff" : "#000",
            },
            transition: "all 0.3s ease-in-out",
          }}
          disabled={page === "..."}
        >
          {page}
        </Button>
      ))}

      <Button
        onClick={() => nextPage()}
        disabled={!getCanNextPage()}
        sx={{
          minWidth: "40px",
          opacity: !getCanNextPage() ? 0.5 : 1,
          transition: "opacity 0.2s",
          '&:hover': {
            backgroundColor: getCanNextPage() && '#1976d2',
          },
        }}
      >
        {">"}
      </Button>
    </Box>
  );
};

export default CustomPagination;
