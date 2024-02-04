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
public class ChiTietCaiDatPK implements Serializable {
    private Long mayTinh;
    private Long phanMem;
}
