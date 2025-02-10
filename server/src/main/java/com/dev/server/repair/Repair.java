package com.dev.server.repair;

import com.dev.server.equipment.Equipment;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "repair")
public class Repair {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;

    private LocalDate sentDate;
    private LocalDate receivedDate;

    @Enumerated(EnumType.STRING)
    private Repair.ServiceType serviceType;

    private String serviceProvider;

    public enum ServiceType {
        MAINTENANCE, BREAKDOWN
    }
}
