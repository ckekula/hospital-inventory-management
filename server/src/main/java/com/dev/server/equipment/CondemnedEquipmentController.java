package com.dev.server.equipment;

import com.dev.server.services.CondemnedEquipmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/condemned-equipment")
public class CondemnedEquipmentController {
    private final CondemnedEquipmentService service;

    public CondemnedEquipmentController(CondemnedEquipmentService service) {
        this.service = service;
    }

    // Get all Condemned Equipment records
    @GetMapping
    public List<CondemnedEquipment> getAllCondemnedEquipment() {
        return service.getAllCondemnedEquipment();
    }

    // Get a specific Condemned Equipment by ID
    @GetMapping("/{id}")
    public ResponseEntity<CondemnedEquipment> getCondemnedEquipmentById(@PathVariable Integer id) {
        return service.getCondemnedEquipmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new Condemned Equipment record
    @PostMapping
    public CondemnedEquipment createCondemnedEquipment(@RequestBody CondemnedEquipment equipmentCondemning) {
        return service.createCondemnedEquipment(equipmentCondemning);
    }

    // Update an existing Condemned Equipment record
    @PutMapping("/{id}")
    public ResponseEntity<CondemnedEquipment> updateCondemnedEquipment(
            @PathVariable Integer id, @RequestBody CondemnedEquipment updatedEquipmentCondemning) {
        try {
            CondemnedEquipment updatedRecord = service.updateCondemnedEquipment(id, updatedEquipmentCondemning);
            return ResponseEntity.ok(updatedRecord);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a condemned Equipment record by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCondemnedEquipment(@PathVariable Integer id) {
        service.deleteCondemnedEquipment(id);
        return ResponseEntity.noContent().build();
    }
}
