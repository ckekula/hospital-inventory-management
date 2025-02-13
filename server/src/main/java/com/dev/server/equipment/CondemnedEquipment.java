package com.dev.server.equipment;

import com.dev.server.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "condemned_equipment")
public class CondemnedEquipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;

    private LocalDate unusableDate;
    private LocalDate forwardedDate;
    private LocalDate condemnedDate;
    private LocalDate removedDate;
    private LocalDate informedBMEDate;
    private LocalDate informedPlanningUnitDate;

    @Column(columnDefinition = "TEXT")
    private String report;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User bme;
}
