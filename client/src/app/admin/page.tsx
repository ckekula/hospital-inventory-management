'use client';

import React from "react";
import { Box } from "@mui/material";
import Header from "@/components/shared/header";
import { UnitSection } from "@/components/admin/unit/UnitSection";
import { Loading, Error } from "@/components/shared/LoadingAndError";
import { useGetUnitsQuery } from "@/state/unitApi";

const Admin: React.FC = () => {
  const { isError: isUnitsError, isLoading: isUnitsLoading } = useGetUnitsQuery();

  if (isUnitsLoading) return <Loading />;
  
  if (isUnitsError) return <Error message="Failed to fetch units data" />;

  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Header name="Units" />
        <UnitSection />
      </Box>
    </div>
  );
};

export default Admin;
