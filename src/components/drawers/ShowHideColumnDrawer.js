import React, { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  Switch,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

const ShowHideColumnDrawer = ({
  open,
  toggleDrawer,
  setSelectedColumns,
  selectedColumns,
  setShowFilteredColumn,
  showFilteredColumn,
}) => {
  const handleToggle = (id) => {
    setSelectedColumns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setShowFilteredColumn(false);
  };

  const showAllColumns = () => {
    setSelectedColumns(
      columns.reduce((acc, column) => ({ ...acc, [column.id]: true }), {})
    );
    setShowFilteredColumn(false);
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
          <Typography variant="h6">Show/Hide Columns</Typography>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>

        {columns.map((column) => (
          <Box
            key={column.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "0.5px solid lightgray",
              px: "10px",
              py: "7px",
              mb: 1,
            }}
          >
            <Typography>{column.label}</Typography>
            {console.log("selectedColumns: ", selectedColumns)}
            <Switch
              checked={selectedColumns[column.id]}
              onChange={() => handleToggle(column.id)}
            />
          </Box>
        ))}

        <Divider sx={{ marginY: 2 }} />

        <Button
          variant="outlined"
          fullWidth
          onClick={showAllColumns}
          sx={{ marginBottom: 2, height: "50px" }}
        >
          Show all columns
        </Button>

        <Button
          variant="contained"
          sx={{ height: "50px" }}
          fullWidth
          onClick={() => setShowFilteredColumn(true)}
        >
          Apply
        </Button>
      </Box>
    </Drawer>
  );
};

export default ShowHideColumnDrawer;
