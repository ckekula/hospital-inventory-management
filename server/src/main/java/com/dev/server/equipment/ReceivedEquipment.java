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
@Table(name = "received_equipment")
public class ReceivedEquipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;

    private LocalDate receivedDate;
    private LocalDate installedDate;
    private LocalDate demonstratedDate;
    private LocalDate operationStartDate;
    private String demonstratorName;
    private String demonstratorDesignation;
    private Integer noOfTrainees;
    private Integer servicesPerAnnum;
    private String recommendedServiceCompany;
    private String agentName;
    private String agentPhone;
    private String companyPhone;
    private String companyEmail;
    private String companyFax;
    private LocalDate serviceCatalogReceivedDate;

    @OneToOne
    @JoinColumn(name = "receiving_officer_id")
    private User receivingOfficer;
}