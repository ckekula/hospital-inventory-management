package com.dev.server.equipment;

import com.dev.server.services.ReceivedEquipmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/received-equipment")
public class ReceivedEquipmentController {
    private final ReceivedEquipmentService service;

    public ReceivedEquipmentController(ReceivedEquipmentService service) {
        this.service = service;
    }

    // Get all Received Equipment records
    @GetMapping
    public List<ReceivedEquipment> getAllReceivedEquipment() {
        return service.getAllReceivedEquipment();
    }

    // Get a specific Received Equipment by ID
    @GetMapping("/{id}")
    public ResponseEntity<ReceivedEquipment> getReceivedEquipmentById(@PathVariable Integer id) {
        return service.getReceivedEquipmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new Received Equipment record
    @PostMapping
    public ReceivedEquipment createReceivedEquipment(@RequestBody ReceivedEquipment receivedEquipment) {
        return service.createReceivedEquipment(receivedEquipment);
    }

    // Update an existing Received Equipment record
    @PutMapping("/{id}")
    public ResponseEntity<ReceivedEquipment> updateReceivedEquipment(
            @PathVariable Integer id, @RequestBody ReceivedEquipment updatedReceivedEquipment) {
        try {
            ReceivedEquipment updatedRecord = service.updateReceivedEquipment(id, updatedReceivedEquipment);
            return ResponseEntity.ok(updatedRecord);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an Received Equipment record by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReceivedEquipment(@PathVariable Integer id) {
        service.deleteReceivedEquipment(id);
        return ResponseEntity.noContent().build();
    }
}
