package com.dev.server.equipment;

import com.dev.server.location.Location;
import com.dev.server.location.Unit;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private Equipment equipment;

    private String manufacturer;
    private String modelNo;

    @Column(unique = true)
    private String serialNo;

    @ManyToOne
    @JoinColumn(name = "assigned_unit_id")
    private Unit assignedUnit;

    private LocalDateTime assignedDate;
    private LocalDateTime purchasedDate;
    private LocalDateTime expDate;
    private LocalDateTime warrantyExpDate;
    private int maintenancePeriod;
    private float cost;
    private String fundingSource;

    @Enumerated(EnumType.STRING)
    private Item.Status status;

    @ManyToOne
    @JoinColumn(name = "current_location_id")
    private Location currentLocation;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;

    public enum Status {
        Active, Inactive
    };
}