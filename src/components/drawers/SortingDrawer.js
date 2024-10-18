import React, { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const columns = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "category", label: "Category" },
  { id: "subcategory", label: "Subcategory" },
  { id: "createdAt", label: "Created At" },
  { id: "updatedAt", label: "Updated At" },
  { id: "price", label: "Price" },
  { id: "sale_price", label: "Sale Price" },
];

const SortingDrawer = ({ open, toggleDrawer, setSorting, sorting }) => {
  const [selectedColumns, setSelectedColumns] = useState(
    columns.reduce((acc, column) => ({ ...acc, [column.id]: true }), {})
  );

  const handleToggle = (id) => {
    setSelectedColumns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    setSorting((prev) => {
      const existingSort = prev.find((sort) => sort.id === id);
      if (existingSort) {
        return prev.map((sort) =>
          sort.id === id ? { ...sort, desc: !existingSort.desc } : sort
        );
      } else {
        return [...prev, { id, desc: false }];
      }
    });
  };

  const handleClearSort = () => {
    setSorting([]); 
  };

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer}>
      <Box
        sx={{
          width: 380,
          px: 5,
          py: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">Sorting Options</Typography>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>

        {columns.map((column) => {
          const isSorted = sorting.some((sort) => sort.id === column.id);
          const sortDirection = isSorted ? sorting.find((sort) => sort.id === column.id)?.desc ? 'desc' : 'asc' : false;

          return (
            <Box
              key={column.id}
              sx={{
                display: "flex",
                alignItems: "center",
                border: "0.5px solid lightgray",
                px: "10px",
                py: "13px",
                mb: 1,
                cursor: "pointer",
                backgroundColor: selectedColumns[column.id] ? "white" : "lightgray",
              }}
              onClick={() => handleToggle(column.id)}
            >
              <Typography>{column.label}</Typography>
              <SwapVertIcon
                sx={{
                  color: isSorted ? (sortDirection === 'desc' ? "blue" : "green") : "lightgray",
                }}
              />
            </Box>
          );
        })}

        <Divider sx={{ marginY: 2 }} />

        <Button
          variant="outlined"
          fullWidth
          onClick={handleClearSort}
          sx={{ marginBottom: 2, height: "50px" }}
        >
          Clear Sort
        </Button>
      </Box>
    </Drawer>
  );
};

export default SortingDrawer;
