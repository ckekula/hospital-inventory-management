package com.dev.server.location;

import com.dev.server.services.LocationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationController {
    private final LocationService service;

    public LocationController(LocationService service) {
        this.service = service;
    }

    // Get all locations
    @GetMapping
    public List<Location> getAllLocations() {
        return service.getAllLocations();
    }

    // Get a location by ID
    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable Integer id) {
        return service.getLocationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new location
    @PostMapping
    public Location createLocation(@RequestBody Location location) {
        return service.createLocation(location);
    }

    // Delete a location by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable Integer id) {
        service.deleteLocation(id);
        return ResponseEntity.noContent().build();
    }
}