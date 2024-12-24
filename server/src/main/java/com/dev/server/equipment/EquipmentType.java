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
@Table(name = "equipmentType")
public class EquipmentType {
    @Id
    @GeneratedValue
    private Integer id;

    private String name;
    private String amount;
    private String minStock;
}
