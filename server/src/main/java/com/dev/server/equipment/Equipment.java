package com.dev.server.equipment;

import com.dev.server.repair.Repair;
import com.dev.server.unit.Unit;
import com.dev.server.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "equipment")
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDate deliveredDate;

    private String brand;
    private String manufacturer;
    private String model;
    private String unitPrice;
    private String receivedVia;
    private String warrantyPeriod;
    private String inventoryNo;
    private String serialNo;

    @ManyToOne
    @JoinColumn(name = "assigned_unit_id")
    private Unit assignedUnit;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReceivedCondition receivedCondition;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "receiving_officer_id")
    private User receivingOfficer;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;

    @OneToOne(mappedBy = "equipment", cascade = CascadeType.ALL)
    private ReceivingDetails receivingDetails;

    @OneToMany(mappedBy = "equipment", cascade = CascadeType.ALL)
    private List<Repair> repair;


    public enum Status {
        ACTIVE, IN_SERVICE, CONDEMNED
    }

    public enum ReceivedCondition {
        BRAND_NEW, RECONDITION, USED
    }
}