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

    // Get all equipment
    public List<Equipment> getAllEquipment() {
        return repository.findAll();
    }

    // Get equipment by ID
    public Optional<Equipment> getEquipmentById(Integer id) {
        return repository.findById(id);
    }

    // Create a new equipment
    public Equipment createEquipment(Equipment equipment) {
        return repository.save(equipment);
    }

    // Update existing equipment
    public Equipment updateEquipment(Integer id, Equipment updatedEquipment) {
        return repository.findById(id).map(existingEquipment -> {
            existingEquipment.setName(updatedEquipment.getName());
            existingEquipment.setType(updatedEquipment.getType());
            existingEquipment.setManufacturer(updatedEquipment.getManufacturer());
            existingEquipment.setModelNo(updatedEquipment.getModelNo());
            existingEquipment.setSerialNo(updatedEquipment.getSerialNo());
            existingEquipment.setAssignedUnit(updatedEquipment.getAssignedUnit());
            existingEquipment.setAssignedDate(updatedEquipment.getAssignedDate());
            existingEquipment.setPurchasedDate(updatedEquipment.getPurchasedDate());
            existingEquipment.setExpDate(updatedEquipment.getExpDate());
            existingEquipment.setWarrantyExpDate(updatedEquipment.getWarrantyExpDate());
            existingEquipment.setMaintenancePeriod(updatedEquipment.getMaintenancePeriod());
            existingEquipment.setCost(updatedEquipment.getCost());
            existingEquipment.setFundingSource(updatedEquipment.getFundingSource());
            existingEquipment.setCurrentLocation(updatedEquipment.getCurrentLocation());
            return repository.save(existingEquipment);
        }).orElseThrow(() -> new RuntimeException("Equipment not found with ID: " + id));
    }

    // Delete equipment by ID
    public void deleteEquipment(Integer id) {
        repository.deleteById(id);
    }
}