package com.dev.server.services;

import com.dev.server.unit.Unit;
import com.dev.server.unit.UnitRepository;
import com.dev.server.user.User;
import com.dev.server.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UnitService {
    private final UnitRepository unitRepository;
    private final UserRepository userRepository;

    public UnitService(UnitRepository unitRepository, UserRepository userRepository) {
        this.unitRepository = unitRepository;
        this.userRepository = userRepository;
    }

    // Get all units
    public List<Unit> getAllUnits() {
        return unitRepository.findAll();
    }

    // Get a unit by ID
    public Optional<Unit> getUnitById(Integer id) {
        return unitRepository.findById(id);
    }

    // Create a new unit
    public Unit createUnit(Unit unit) {
        return unitRepository.save(unit);
    }

    // Update Unit head
    public Unit updateUnitHead(Integer unitId, Integer userId) {
        Unit unit = unitRepository.findById(unitId)
                .orElseThrow(() -> new RuntimeException("Unit not found with id: " + unitId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        unit.setHead(user);
        return unitRepository.save(unit);
    }

    // Delete a unit by ID
    public void deleteUnit(Integer id) {
        unitRepository.deleteById(id);
    }
}