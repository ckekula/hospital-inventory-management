package com.dev.server.services;

import com.dev.server.equipment.Equipment;
import com.dev.server.equipment.EquipmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipmentService {
    private final EquipmentRepository repository;

    public EquipmentService(EquipmentRepository repository) {
        this.repository = repository;
    }

    public List<Equipment> getAllEquipment() {
        return repository.findAll();
    }

    public Optional<Equipment> getEquipmentById(Integer id) {
        return repository.findById(id);
    }

    public Equipment createEquipment(Equipment equipment) {
        return repository.save(equipment);
    }

    public Equipment updateEquipment(Integer id, Equipment updatedEquipment) {
        return repository.findById(id)
                .map(equipment -> {
                    equipment.setName(updatedEquipment.getName());
                    equipment.setQuantity(updatedEquipment.getQuantity());
                    equipment.setMinStock(updatedEquipment.getMinStock());
                    return repository.save(equipment);
                })
                .orElseThrow(() -> new RuntimeException("Equipment not found"));
    }

    public void deleteEquipment(Integer id) {
        repository.deleteById(id);
    }
}