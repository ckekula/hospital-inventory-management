package com.dev.server.services;

import com.dev.server.location.Location;
import com.dev.server.location.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {
    private final LocationRepository repository;

    public LocationService(LocationRepository repository) {
        this.repository = repository;
    }

    // Get all locations
    public List<Location> getAllLocations() {
        return repository.findAll();
    }

    // Get a location by ID
    public Optional<Location> getLocationById(Integer id) {
        return repository.findById(id);
    }

    // Create a new location
    public Location createLocation(Location location) {
        return repository.save(location);
    }

    // Delete a location by ID
    public void deleteLocation(Integer id) {
        repository.deleteById(id);
    }
}