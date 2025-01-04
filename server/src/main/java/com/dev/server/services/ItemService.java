package com.dev.server.services;

import com.dev.server.equipment.Item;
import com.dev.server.equipment.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    private final ItemRepository repository;

    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    // Get all Items
    public List<Item> getAllItems() {
        return repository.findAll();
    }

    // Get Item by ID
    public Optional<Item> getItemById(Integer id) {
        return repository.findById(id);
    }

    // Create a new Item
    public Item createItem(Item item) {
        return repository.save(item);
    }

    // Update existing Item
    public Item updateItem(Integer id, Item updatedItem) {
        return repository.findById(id).map(existingItem -> {
            existingItem.setName(updatedItem.getName());
            existingItem.setEquipment(updatedItem.getEquipment());
            existingItem.setManufacturer(updatedItem.getManufacturer());
            existingItem.setModelNo(updatedItem.getModelNo());
            existingItem.setSerialNo(updatedItem.getSerialNo());
            existingItem.setAssignedUnit(updatedItem.getAssignedUnit());
            existingItem.setAssignedDate(updatedItem.getAssignedDate());
            existingItem.setPurchasedDate(updatedItem.getPurchasedDate());
            existingItem.setExpDate(updatedItem.getExpDate());
            existingItem.setWarrantyExpDate(updatedItem.getWarrantyExpDate());
            existingItem.setMaintenancePeriod(updatedItem.getMaintenancePeriod());
            existingItem.setCost(updatedItem.getCost());
            existingItem.setFundingSource(updatedItem.getFundingSource());
            existingItem.setCurrentLocation(updatedItem.getCurrentLocation());
            return repository.save(existingItem);
        }).orElseThrow(() -> new RuntimeException("Item not found with ID: " + id));
    }

    // Delete Item by ID
    public void deleteItem(Integer id) {
        repository.deleteById(id);
    }
}