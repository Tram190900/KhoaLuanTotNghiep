package com.iuh.nhom6.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Entity
@Transactional
@Data
@NoArgsConstructor
public class ChiTietLapDat implements Serializable {
    @Id
    @ManyToOne
    @JoinColumn(name = "mayTinh_id",referencedColumnName = "mayTinh_id")
    private MayTinh mayTinh;

    @Id
    @ManyToOne
    @JoinColumn(name = "thietBi_id",referencedColumnName = "thietBi_id")
    private ThietBi thietBi;

    private Date ngayLapDat;
}
