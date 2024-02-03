package com.iuh.nhom6.model;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@Embeddable
public class ChiTietLapDatPK implements Serializable {
    private Long thietBi;
    private Long mayTinh;
}
