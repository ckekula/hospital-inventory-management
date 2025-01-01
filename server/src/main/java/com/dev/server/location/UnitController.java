package com.dev.server.location;

import com.dev.server.services.UnitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/units")
public class UnitController {
    private final UnitService service;

    public UnitController(UnitService service) {
        this.service = service;
    }

    // Get all units
    @GetMapping
    public List<Unit> getAllUnits() {
        return service.getAllUnits();
    }

    // Get a unit by ID
    @GetMapping("/{id}")
    public ResponseEntity<Unit> getUnitById(@PathVariable Integer id) {
        return service.getUnitById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new unit
    @PostMapping
    public Unit createUnit(@RequestBody Unit unit) {
        return service.createUnit(unit);
    }

    // Delete a unit by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUnit(@PathVariable Integer id) {
        service.deleteUnit(id);
        return ResponseEntity.noContent().build();
    }
}