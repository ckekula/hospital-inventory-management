import { Box } from "@mui/material";

export const Loading: React.FC = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
    Loading...
  </Box>
);

export const Error: React.FC<{ message: string }> = ({ message }) => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px" color="error.main">
    {message}
  </Box>
);