import React from "react";
import {
  TableCell,
  TableRow,
  Box,
  CircularProgress,
} from "@mui/material";

const Loading = ({columns}) => {
  return (
    <TableRow>
      <TableCell
        colSpan={columns.length}
        sx={{ textAlign: "center", maxWidth: "200px" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default Loading;
