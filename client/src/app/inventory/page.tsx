'use client';

import React from "react";
import { Box } from "@mui/material";
import Header from "@/components/shared/header";
import { InventorySection } from "@/components/inventory/InventorySection";

const Inventory: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Header name="Inventory" />
      <InventorySection />
    </Box>
  );
};

export default Inventory;