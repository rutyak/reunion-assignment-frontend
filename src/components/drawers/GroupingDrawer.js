import React, { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  Button,
  Divider,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const GroupingDrawer = ({
  open,
  toggleDrawer,
  setGroupByColumn,
  groupByColumn,
}) => {
  const [selectedColumn, setSelectedColumn] = useState(groupByColumn);

  const handleChange = (e) => {
    const newColumn = e.target.value;
    setSelectedColumn(newColumn);
    setGroupByColumn(newColumn);
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
          height:"100vh"
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography  variant="h5" fontWeight="bold" color="#333">Create Groups</Typography>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>

        <FormControl fullWidth variant="outlined" size="small">
          <Select
            labelId="select-label"
            value={selectedColumn}
            onChange={handleChange}
            displayEmpty
            sx={{
              bgcolor: "#fff",
              "& .MuiSelect-select": {
                padding: "8px 12px",
              },
            }}
          >
            <MenuItem value="">
              <Typography variant="body2">Select a column</Typography>
            </MenuItem>
            <MenuItem value="category">Category</MenuItem>
            <MenuItem value="subcategory">Subcategory</MenuItem>
          </Select>
        </FormControl>

        <Divider sx={{ marginY: 2 }} />

        <Button
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: 2,
            height: "50px",
            mb: 2,
            color: "#333",
            "&:hover": {
              bgColor: "#e0e0e0",
            },
          }}
          onClick={() => {
            setSelectedColumn("");
            setGroupByColumn("");
          }}
        >
          Clear Grouping
        </Button>

        <Button
          variant="contained"
          sx={{
            height: "50px",
            bgcolor: "#007bff",
            color: "#fff",
            "&:hover": {
              bgcolor: "#0056b3",
            },
          }}
          fullWidth
        >
          Apply Grouping
        </Button>
      </Box>
    </Drawer>
  );
};

export default GroupingDrawer;
