package com.dev.server.services;

import com.dev.server.equipment.ReceivedEquipment;
import com.dev.server.equipment.ReceivedEquipmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReceivedEquipmentService {
    private final ReceivedEquipmentRepository repository;

    public ReceivedEquipmentService(ReceivedEquipmentRepository repository) {
        this.repository = repository;
    }

    // Get all Received Equipment records
    public List<ReceivedEquipment> getAllReceivedEquipment() {
        return repository.findAll();
    }

    // Get a specific Received Equipment record by ID
    public Optional<ReceivedEquipment> getReceivedEquipmentById(Integer id) {
        return repository.findById(id);
    }

    // Create a new EquipmentReceiving record
    public ReceivedEquipment createReceivedEquipment(ReceivedEquipment receivedEquipment) {
        return repository.save(receivedEquipment);
    }

    // Update an existing EquipmentReceiving record
    public ReceivedEquipment updateReceivedEquipment(Integer id, ReceivedEquipment updatedReceivedEquipment) {
        return repository.findById(id)
                .map(existingRecord -> {
                    existingRecord.setEquipment(updatedReceivedEquipment.getEquipment());
                    existingRecord.setReceivedDate(updatedReceivedEquipment.getReceivedDate());
                    existingRecord.setInstalledDate(updatedReceivedEquipment.getInstalledDate());
                    existingRecord.setDemonstratedDate(updatedReceivedEquipment.getDemonstratedDate());
                    existingRecord.setOperationStartDate(updatedReceivedEquipment.getOperationStartDate());
                    existingRecord.setDemonstratorName(updatedReceivedEquipment.getDemonstratorName());
                    existingRecord.setDemonstratorDesignation(updatedReceivedEquipment.getDemonstratorDesignation());
                    existingRecord.setNoOfTrainees(updatedReceivedEquipment.getNoOfTrainees());
                    existingRecord.setServicesPerAnnum(updatedReceivedEquipment.getServicesPerAnnum());
                    existingRecord.setRecommendedServiceCompany(updatedReceivedEquipment.getRecommendedServiceCompany());
                    existingRecord.setAgentName(updatedReceivedEquipment.getAgentName());
                    existingRecord.setAgentPhone(updatedReceivedEquipment.getAgentPhone());
                    existingRecord.setCompanyPhone(updatedReceivedEquipment.getCompanyPhone());
                    existingRecord.setCompanyEmail(updatedReceivedEquipment.getCompanyEmail());
                    existingRecord.setCompanyFax(updatedReceivedEquipment.getCompanyFax());
                    existingRecord.setServiceCatalogReceivedDate(updatedReceivedEquipment.getServiceCatalogReceivedDate());
                    existingRecord.setReceivingOfficer(updatedReceivedEquipment.getReceivingOfficer());

                    return repository.save(existingRecord);
                })
                .orElseThrow(() -> new RuntimeException("EquipmentReceiving record not found with ID: " + id));
    }

    // Delete an EquipmentReceiving record by ID
    public void deleteReceivedEquipment(Integer id) {
        repository.deleteById(id);
    }
}
