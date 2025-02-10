package com.dev.server.unit;

import com.dev.server.services.UnitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/unit")
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

    // Update Unit Head
    @PutMapping("/{id}")
    public ResponseEntity<Unit> updateUnitHead(@PathVariable Integer unitId, @PathVariable Integer userId) {
        try {
            Unit updatedUnit = service.updateUnitHead(unitId, userId);
            return ResponseEntity.ok(updatedUnit);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a unit by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUnit(@PathVariable Integer id) {
        service.deleteUnit(id);
        return ResponseEntity.noContent().build();
    }
}