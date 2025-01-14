import ItemsSection from '@/components/items/ItemsSection';
import Header from '@/components/shared/header';
import { Box } from '@mui/material';
import React from 'react'

const Items = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Header name="Inventory" />
      <ItemsSection />
    </Box>
  );
}

export default Items