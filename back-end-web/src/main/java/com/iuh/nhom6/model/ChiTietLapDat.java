package com.iuh.nhom6.model;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Entity
@Transactional
@Data
@NoArgsConstructor
@IdClass(ChiTietLapDatPK.class)
public class ChiTietLapDat implements Serializable {
    @Id
    @ManyToOne
    @JoinColumn(name = "mayTinh_id",referencedColumnName = "mayTinh_id")
    private MayTinh mayTinh;

    @Id
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "thietBi_id",referencedColumnName = "thietBi_id")
    private ThietBi thietBi;

    private Date ngayLapDat;
}
