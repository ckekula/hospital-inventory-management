package com.dev.server.services;

import com.dev.server.equipment.CondemnedEquipment;
import com.dev.server.equipment.CondemnedEquipmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CondemnedEquipmentService {
    private final CondemnedEquipmentRepository repository;

    public CondemnedEquipmentService(CondemnedEquipmentRepository repository) {
        this.repository = repository;
    }

    // Get all EquipmentCondemning records
    public List<CondemnedEquipment> getAllCondemnedEquipment() {
        return repository.findAll();
    }

    // Get a specific EquipmentCondemning record by ID
    public Optional<CondemnedEquipment> getCondemnedEquipmentById(Integer id) {
        return repository.findById(id);
    }

    // Create a new EquipmentCondemning record
    public CondemnedEquipment createCondemnedEquipment(CondemnedEquipment condemnedEquipment) {
        return repository.save(condemnedEquipment);
    }

    // Update an existing EquipmentCondemning record
    public CondemnedEquipment updateCondemnedEquipment(Integer id, CondemnedEquipment updatedCondemnedEquipment) {
        return repository.findById(id)
                .map(existingRecord -> {
                    existingRecord.setEquipment(updatedCondemnedEquipment.getEquipment());
                    existingRecord.setUnusableDate(updatedCondemnedEquipment.getUnusableDate());
                    existingRecord.setForwardedDate(updatedCondemnedEquipment.getForwardedDate());
                    existingRecord.setCondemnedDate(updatedCondemnedEquipment.getCondemnedDate());
                    existingRecord.setRemovedDate(updatedCondemnedEquipment.getRemovedDate());
                    existingRecord.setInformedBMEDate(updatedCondemnedEquipment.getInformedBMEDate());
                    existingRecord.setInformedPlanningUnitDate(updatedCondemnedEquipment.getInformedPlanningUnitDate());
                    existingRecord.setReport(updatedCondemnedEquipment.getReport());
                    existingRecord.setBme(updatedCondemnedEquipment.getBme());

                    return repository.save(existingRecord);
                })
                .orElseThrow(() -> new RuntimeException("Condemned Equipment record not found with ID: " + id));
    }

    // Delete an EquipmentCondemning record by ID
    public void deleteCondemnedEquipment(Integer id) {
        repository.deleteById(id);
    }
}
