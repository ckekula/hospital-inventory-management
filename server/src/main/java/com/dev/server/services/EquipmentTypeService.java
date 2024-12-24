package com.dev.server.services;

import com.dev.server.equipment.EquipmentType;
import com.dev.server.equipment.EquipmentTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipmentTypeService {
    private final EquipmentTypeRepository repository;

    public EquipmentTypeService(EquipmentTypeRepository repository) {
        this.repository = repository;
    }

    public List<EquipmentType> getAllEquipmentTypes() {
        return repository.findAll();
    }

    public Optional<EquipmentType> getEquipmentTypeById(Integer id) {
        return repository.findById(id);
    }

    public EquipmentType createEquipmentType(EquipmentType equipmentType) {
        return repository.save(equipmentType);
    }

    public EquipmentType updateEquipmentType(Integer id, EquipmentType updatedEquipmentType) {
        return repository.findById(id)
                .map(equipmentType -> {
                    equipmentType.setName(updatedEquipmentType.getName());
                    equipmentType.setQuantity(updatedEquipmentType.getQuantity());
                    equipmentType.setMinStock(updatedEquipmentType.getMinStock());
                    return repository.save(equipmentType);
                })
                .orElseThrow(() -> new RuntimeException("EquipmentType not found"));
    }

    public void deleteEquipmentType(Integer id) {
        repository.deleteById(id);
    }
}