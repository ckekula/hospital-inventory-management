package com.dev.server.location;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "unit")
@EntityListeners(AuditingEntityListener.class)
public class Unit {
    @Id
    @GeneratedValue
    private Integer id;

    private String name;
    private String unitHead;
}
