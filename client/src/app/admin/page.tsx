'use client';

import React from "react";
import { Box } from "@mui/material";
import Header from "@/components/shared/header";
import { UnitSection } from "@/components/admin/unit/UnitSection";
import { Loading, Error } from "@/components/admin/LoadingAndError";
import { useGetUnitsQuery } from "@/state/unitApi";

const Admin: React.FC = () => {
  const { isError, isLoading } = useGetUnitsQuery();

  if (isLoading) return <Loading />;
  if (isError) return <Error message="Failed to fetch data" />;

  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Header name="Units" />
        <UnitSection />
      </Box>

      <Box sx={{ p:3 }}>
        <Header name="Locations" />
        <UnitSection />
      </Box>

      <Box sx={{ p:3 }}>
        <Header name="Users" />
        <UnitSection />
      </Box>
    </div>
  );
};

export default Admin;