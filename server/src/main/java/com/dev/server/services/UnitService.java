package com.dev.server.services;

import com.dev.server.unit.Unit;
import com.dev.server.unit.UnitRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UnitService {
    private final UnitRepository repository;

    public UnitService(UnitRepository repository) {
        this.repository = repository;
    }

    // Get all units
    public List<Unit> getAllUnits() {
        return repository.findAll();
    }

    // Get a unit by ID
    public Optional<Unit> getUnitById(Integer id) {
        return repository.findById(id);
    }

    // Create a new unit
    public Unit createUnit(Unit unit) {
        return repository.save(unit);
    }

    // Delete a unit by ID
    public void deleteUnit(Integer id) {
        repository.deleteById(id);
    }
}