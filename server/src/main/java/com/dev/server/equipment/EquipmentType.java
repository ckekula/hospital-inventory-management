package com.dev.server.equipment;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "equipment_type")
public class EquipmentType {
    @Id
    @GeneratedValue
    private Integer id;

    private String name;
    private int quantity;
    private int minStock;
}
