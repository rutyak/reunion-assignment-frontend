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

const FilteringDrawer = ({
  open,
  toggleDrawer,
  onApplyFilters,
  setFilters,
  filters,
  setShowAllFilteredData,
}) => {
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
          ? field === "price"
            ? [11, 117]
            : [11, 100]
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
      price: [11, 117],
      saleprice: [11, 100],
    });
  };

  const handleApplyFilters = () => {
    setShowAllFilteredData(true);
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
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        sx={{ "& .MuiDrawer-paper": { bgcolor: "#f5f5f5"}, height:"100vh" }} 
      >
        <Box
          sx={{
            width: 370,
            px: 3,
            py: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h5" fontWeight="bold" color="#333">
              Filters
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon sx={{ color: "#333" }} />
            </IconButton>
          </Box>

          {filterConfig.map((filter) => (
            <Box
              key={filter.name}
              sx={{
                border: "1px solid lightgray",
                borderRadius: "8px",
                p: 2,
                mb: 2,
                bgcolor: "#fff", 
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="body1">
                  {filter.label}
                </Typography>
                <IconButton
                  onClick={() => resetField(filter.name)}
                  sx={{ ml: 1 }}
                >
                  <SyncIcon sx={{ color: "#007bff" }} />
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
                        sx={{ bgcolor: "#007bff", color: "#fff", m: 0.5 }} // Style chips
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
                  sx={{
                    ml: "18px",
                    mt: 2,
                    width: "80%",
                    color: "#007bff",
                    "& .MuiSlider-thumb": {
                      backgroundColor: "#fff",
                      border: "2px solid #007bff",
                    },
                  }}
                  value={filters[filter.name]}
                  onChange={handleRangeChange(filter.name)}
                  valueLabelDisplay="auto"
                  min={11}
                  max={filter.name === "price" ? 117 : 100}
                />
              ) : filter.type === "date" ? (
                <DateRangePicker
                  id={filter.name}
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
                        sx={{ width: "80%", ml: "10px", bgcolor: "#f0f0f0" }} 
                      />
                      <TextField
                        {...endProps}
                        variant="outlined"
                        size="small"
                        sx={{ width: "80%", ml: "10px", bgcolor: "#f0f0f0" }} 
                      />
                    </>
                  )}
                />
              ) : (
                <TextField
                  sx={{ ml: "9px", width: "80%", bgcolor: "#f0f0f0" }} 
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
            sx={{
              mb: 2,
              height: "50px",
              bgcolor: "#007bff",
              color: "#fff",
              "&:hover": {
                bgcolor: "#0056b3",
              },
            }}
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              mb: 2,
              height: "50px",
              color: "#333",
              "&:hover": {
                bgcolor: "#f0f0f0",
              },
            }}
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        </Box>
      </Drawer>
    </LocalizationProvider>
  );
};

export default FilteringDrawer;
