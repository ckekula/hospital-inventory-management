package com.dev.server.equipment;

import com.dev.server.services.EquipmentTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/equipment-types")
public class EquipmentTypeController {
    private final EquipmentTypeService service;

    public EquipmentTypeController(EquipmentTypeService service) {
        this.service = service;
    }

    @GetMapping
    public List<EquipmentType> getAllEquipmentTypes() {
        return service.getAllEquipmentTypes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EquipmentType> getEquipmentTypeById(@PathVariable Integer id) {
        return service.getEquipmentTypeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public EquipmentType createEquipmentType(@RequestBody EquipmentType equipmentType) {
        return service.createEquipmentType(equipmentType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EquipmentType> updateEquipmentType(@PathVariable Integer id, @RequestBody EquipmentType updatedEquipmentType) {
        try {
            return ResponseEntity.ok(service.updateEquipmentType(id, updatedEquipmentType));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipmentType(@PathVariable Integer id) {
        service.deleteEquipmentType(id);
        return ResponseEntity.noContent().build();
    }
}