package com.dev.server.unit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Integer> {
}