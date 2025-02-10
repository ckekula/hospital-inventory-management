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
                .map(existingEquipment -> {
                    existingEquipment.setName(updatedEquipment.getName());
                    existingEquipment.setDeliveredDate(updatedEquipment.getDeliveredDate());
                    existingEquipment.setBrand(updatedEquipment.getBrand());
                    existingEquipment.setManufacturer(updatedEquipment.getManufacturer());
                    existingEquipment.setModel(updatedEquipment.getModel());
                    existingEquipment.setUnitPrice(updatedEquipment.getUnitPrice());
                    existingEquipment.setReceivedVia(updatedEquipment.getReceivedVia());
                    existingEquipment.setWarrantyPeriod(updatedEquipment.getWarrantyPeriod());
                    existingEquipment.setInventoryNo(updatedEquipment.getInventoryNo());
                    existingEquipment.setSerialNo(updatedEquipment.getSerialNo());
                    existingEquipment.setAssignedUnit(updatedEquipment.getAssignedUnit());
                    existingEquipment.setReceivedCondition(updatedEquipment.getReceivedCondition());
                    existingEquipment.setStatus(updatedEquipment.getStatus());
                    existingEquipment.setReceivingOfficer(updatedEquipment.getReceivingOfficer());
                    return repository.save(existingEquipment);
                })
                .orElseThrow(() -> new RuntimeException("Equipment not found with ID: " + id));
    }

    public void deleteEquipment(Integer id) {
        repository.deleteById(id);
    }
}