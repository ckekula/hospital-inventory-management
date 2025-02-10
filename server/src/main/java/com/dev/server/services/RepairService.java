package com.dev.server.services;

import com.dev.server.repair.Repair;
import com.dev.server.repair.RepairRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RepairService {
    private final RepairRepository repository;

    public RepairService(RepairRepository repository) {
        this.repository = repository;
    }

    // Get all Repair records
    public List<Repair> getAllRepairs() {
        return repository.findAll();
    }

    // Get a specific Repair record by ID
    public Optional<Repair> getRepairById(Integer id) {
        return repository.findById(id);
    }

    // Create a new Repair record
    public Repair createRepair(Repair repair) {
        return repository.save(repair);
    }

    // Update an existing Repair record
    public Repair updateRepair(Integer id, Repair updatedRepair) {
        return repository.findById(id)
                .map(existingRecord -> {
                    existingRecord.setEquipment(updatedRepair.getEquipment());
                    existingRecord.setSentDate(updatedRepair.getSentDate());
                    existingRecord.setReceivedDate(updatedRepair.getReceivedDate());
                    existingRecord.setServiceType(updatedRepair.getServiceType());
                    existingRecord.setServiceProvider(updatedRepair.getServiceProvider());

                    return repository.save(existingRecord);
                })
                .orElseThrow(() -> new RuntimeException("Repair record not found with ID: " + id));
    }

    // Delete a Repair record by ID
    public void deleteRepair(Integer id) {
        repository.deleteById(id);
    }
}
