import React from "react";
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
          bgcolor: "#f5f5f5", 
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" color="#333">
            Show/Hide Columns
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon sx={{ color: "#333" }} />
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
              borderRadius: 1,
              px: 2,
              py: 1,
              mb: 1, 
            }}
          >
            <Typography variant="body1">{column.label}</Typography>
            <Switch
              checked={selectedColumns[column.id]}
              onChange={() => handleToggle(column.id)}
              color="primary"
            />
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Button
          variant="outlined"
          fullWidth
          onClick={showAllColumns}
          sx={{
            mb: 2,
            height: "50px",
            color: "#333",
            borderColor: "#007bff", 
            '&:hover': {
              bgcolor: "#e0e0e0", 
            },
          }}
        >
          Show All Columns
        </Button>

        <Button
          variant="contained"
          sx={{
            height: "50px",
            bgcolor: "#007bff",
            color: "#fff",
            '&:hover': {
              bgcolor: "#0056b3", 
            },
          }}
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
