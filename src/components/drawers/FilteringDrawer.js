import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  Button,
  Divider,
  IconButton,
  TextField,
  Autocomplete,
  Chip,
  Slider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SyncIcon from "@mui/icons-material/Sync";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro";

const Base_url = process.env.REACT_APP_BACKEND_URL;

const filterConfig = [
  { name: "name", label: "Name", type: "text", placeholder: "Enter name" },
  { name: "category", label: "Category", type: "multi-select" },
  { name: "subcategory", label: "Subcategory", type: "multi-select" },
  { name: "createdAt", label: "Created At", type: "date" },
  { name: "updatedAt", label: "Updated At", type: "date" },
  { name: "price", label: "Price", type: "range" },
  { name: "saleprice", label: "Sale Price", type: "range" },
];

const FilteringDrawer = ({ open, toggleDrawer, onApplyFilters }) => {
  const [filters, setFilters] = useState({
    name: "",
    category: [],
    subcategory: [],
    createdAt: [null, null],
    updatedAt: [null, null],
    price: [11, 100],
    saleprice: [11, 100],
  });

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);

  const handleFilterChange = (field) => (e) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: e.target.value }));
  };

  const handleRangeChange = (field) => (event, newValue) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: newValue }));
  };

  const handleCategoryChange = (event, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, category: value }));
  };

  const handleSubcategoryChange = (event, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, subcategory: value }));
  };

  const handleDateRangeChange = (newValue) => {
    setFilters((prevFilters) => ({ ...prevFilters, createdAt: newValue }));
  };

  const resetField = (field) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]:
        filterConfig.find((f) => f.name === field).type === "range"
          ? [11, 100]
          : filterConfig.find((f) => f.name === field).type === "date"
          ? [null, null]
          : "",
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      category: [],
      subcategory: [],
      createdAt: [null, null],
      updatedAt: [null, null],
      price: [11, 100],
      saleprice: [11, 100],
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${Base_url}/alldata`);
        const data = await res.json();
        const categories = [...new Set(data.data.map((item) => item.category))];
        const subcategories = [
          ...new Set(data.data.map((item) => item.subcategory)),
        ];
        setCategoryOptions(categories);
        setSubcategoryOptions(subcategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 370,
            px: 5,
            py: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          {filterConfig.map((filter) => (
            <Box
              key={filter.name}
              sx={{
                border: "1px solid lightgray",
                borderRadius: "5px",
                p: 1,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  px: 1,
                  alignItems: "center",
                }}
              >
                <label style={{ flex: 1 }}>{filter.label}</label>
                <IconButton
                  onClick={() => resetField(filter.name)}
                  sx={{ ml: 1 }}
                >
                  <SyncIcon />
                </IconButton>
              </Box>

              {filter.type === "multi-select" ? (
                <Autocomplete
                  multiple
                  options={
                    filter.name === "category"
                      ? categoryOptions
                      : subcategoryOptions
                  }
                  value={filters[filter.name]}
                  onChange={
                    filter.name === "category"
                      ? handleCategoryChange
                      : handleSubcategoryChange
                  }
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={option}
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder={`Select ${filter.label.toLowerCase()}`}
                      size="small"
                      sx={{ ml: "10px", width: "80%" }}
                    />
                  )}
                />
              ) : filter.type === "range" ? (
                <Slider
                  sx={{ ml: "18px", mt: "30px", width: "80%" }}
                  value={filters[filter.name]}
                  onChange={handleRangeChange(filter.name)}
                  valueLabelDisplay="auto"
                  min={11}
                  max={100}
                />
              ) : filter.type === "date" ? (
                <DateRangePicker
                  startText="Start Date"
                  endText="End Date"
                  value={filters.createdAt}
                  onChange={handleDateRangeChange}
                  renderInput={(startProps, endProps) => (
                    <>
                      <TextField
                        {...startProps}
                        variant="outlined"
                        size="small"
                        sx={{ width: "80%", ml: "10px" }}
                      />
                      <TextField
                        {...endProps}
                        variant="outlined"
                        size="small"
                        sx={{ width: "80%", ml: "10px" }}
                      />
                    </>
                  )}
                />
              ) : (
                <TextField
                  sx={{ ml: "9px", width: "80%" }}
                  value={filters[filter.name]}
                  onChange={handleFilterChange(filter.name)}
                  variant="outlined"
                  placeholder={
                    filter.placeholder || `Enter ${filter.label.toLowerCase()}`
                  }
                  size="small"
                />
              )}
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Button
            variant="outlined"
            fullWidth
            sx={{ mb: 2, height: "50px" }}
            onClick={clearFilters}
          >
            Clear Filters
          </Button>

          <Button
            variant="contained"
            sx={{ height: "50px" }}
            fullWidth
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </LocalizationProvider>
  );
};

export default FilteringDrawer;
