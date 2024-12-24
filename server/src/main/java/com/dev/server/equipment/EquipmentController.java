package com.dev.server.equipment;

import com.dev.server.services.EquipmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipment")
public class EquipmentController {
    private final EquipmentService service;

    public EquipmentController(EquipmentService service) {
        this.service = service;
    }

    // Get all equipment
    @GetMapping
    public List<Equipment> getAllEquipment() {
        return service.getAllEquipment();
    }

    // Get equipment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Equipment> getEquipmentById(@PathVariable Integer id) {
        return service.getEquipmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create new equipment
    @PostMapping
    public Equipment createEquipment(@RequestBody Equipment equipment) {
        return service.createEquipment(equipment);
    }

    // Update equipment by ID
    @PutMapping("/{id}")
    public ResponseEntity<Equipment> updateEquipment(@PathVariable Integer id, @RequestBody Equipment updatedEquipment) {
        try {
            return ResponseEntity.ok(service.updateEquipment(id, updatedEquipment));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete equipment by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipment(@PathVariable Integer id) {
        service.deleteEquipment(id);
        return ResponseEntity.noContent().build();
    }
}