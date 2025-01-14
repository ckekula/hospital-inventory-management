'use client';

import React from "react";
import { Box } from "@mui/material";
import Header from "@/components/shared/header";
import { UnitSection } from "@/components/admin/unit/UnitSection";
import { Loading, Error } from "@/components/shared/LoadingAndError";
import { useGetUnitsQuery } from "@/state/unitApi";
import { useGetLocationsQuery } from "@/state/locationApi";
import { LocationSection } from "@/components/admin/location/LocationSection";

const Admin: React.FC = () => {
  const { isError: isUnitsError, isLoading: isUnitsLoading } = useGetUnitsQuery();
  const { isError: isLocationsError, isLoading: isLocationsLoading } = useGetLocationsQuery();

  if (isUnitsLoading || isLocationsLoading) return <Loading />;
  
  if (isUnitsError) return <Error message="Failed to fetch units data" />;
  if (isLocationsError) return <Error message="Failed to fetch locations data" />;

  return (
    <div>
      <Box sx={{ p: 3 }}>
        <Header name="Units" />
        <UnitSection />
      </Box>

      <Box sx={{ p: 3 }}>
        <Header name="Locations" />
        <LocationSection />
      </Box>
    </div>
  );
};

export default Admin;
