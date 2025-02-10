package com.dev.server.repair;

import com.dev.server.services.RepairService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/repairs")
public class RepairController {
    private final RepairService service;

    public RepairController(RepairService service) {
        this.service = service;
    }

    // Get all Repair records
    @GetMapping
    public List<Repair> getAllRepairs() {
        return service.getAllRepairs();
    }

    // Get a specific Repair by ID
    @GetMapping("/{id}")
    public ResponseEntity<Repair> getRepairById(@PathVariable Integer id) {
        return service.getRepairById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new Repair record
    @PostMapping
    public Repair createRepair(@RequestBody Repair repair) {
        return service.createRepair(repair);
    }

    // Update an existing Repair record
    @PutMapping("/{id}")
    public ResponseEntity<Repair> updateRepair(
            @PathVariable Integer id, @RequestBody Repair updatedRepair) {
        try {
            Repair updatedRecord = service.updateRepair(id, updatedRepair);
            return ResponseEntity.ok(updatedRecord);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a Repair record by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRepair(@PathVariable Integer id) {
        service.deleteRepair(id);
        return ResponseEntity.noContent().build();
    }
}
