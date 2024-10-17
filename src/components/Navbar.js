import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FilterListIcon from "@mui/icons-material/FilterList";
import LayersIcon from "@mui/icons-material/Layers";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import ShowHideColumnDrawer from "./drawers/ShowHideColumnDrawer";
import SortingDrawer from "./drawers/SortingDrawer";
import FilteringDrawer from "./drawers/FilteringDrawer";
import GroupingDrawer from "./drawers/GroupingDrawer";

const Navbar = ({
  setSearch,
  search,
  setSelectedColumns,
  selectedColumns,
  setShowFilteredColumn,
  showFilteredColumn,
  setGroupByColumn,
  groupByColumn,
  setSorting,
  sorting,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState("");

  const toggleDrawer = (type) => {
    setDrawerOpen(!drawerOpen);
    setDrawerType(type);
  };

  const iconButtonStyle = {
    color: "gray",
    "&:hover": { color: "#1976d2" },
    transition: "color 0.3s",
  };

  const handleSearchChange = (event) => {
    const value = event.target.value || "";
    setSearch(value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        gap: "15px",
        margin: "10px",
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search"
        value={search || ""}
        onChange={handleSearchChange}
        sx={{
          width: "240px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "25px",
            paddingRight: 1,
          },
          "& .MuiOutlinedInput-input": {
            padding: "10px 0px",
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "gray" }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Icons */}
      <div>
        <IconButton
          onClick={() => toggleDrawer("showhidecolumndrawer")}
          sx={iconButtonStyle}
        >
          <VisibilityIcon />
        </IconButton>
        <IconButton
          onClick={() => toggleDrawer("sortingdrawer")}
          sx={iconButtonStyle}
        >
          <SwapVertIcon />
        </IconButton>
        <IconButton
          onClick={() => toggleDrawer("filteringdrawer")}
          sx={iconButtonStyle}
        >
          <FilterListIcon />
        </IconButton>
        <IconButton
          onClick={() => toggleDrawer("groupingdrawer")}
          sx={iconButtonStyle}
        >
          <LayersIcon />
        </IconButton>
      </div>

      {/* Drawer */}
      {drawerOpen && drawerType === "showhidecolumndrawer" && (
        <ShowHideColumnDrawer
          open={drawerOpen}
          toggleDrawer={toggleDrawer}
          setSelectedColumns={setSelectedColumns}
          selectedColumns={selectedColumns}
          setShowFilteredColumn={setShowFilteredColumn}
          showFilteredColumn={showFilteredColumn}
        />
      )}
      {drawerOpen && drawerType === "sortingdrawer" && (
        <SortingDrawer
          open={drawerOpen}
          toggleDrawer={toggleDrawer}
          setSorting={setSorting}
          sorting={sorting}
        />
      )}
      {drawerOpen && drawerType === "filteringdrawer" && (
        <FilteringDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
      )}
      {drawerOpen && drawerType === "groupingdrawer" && (
        <GroupingDrawer
          open={drawerOpen}
          toggleDrawer={toggleDrawer}
          setGroupByColumn={setGroupByColumn}
          groupByColumn={groupByColumn}
        />
      )}
    </div>
  );
};

export default Navbar;
