package com.iuh.nhom6.model;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Transactional
@Data
@NoArgsConstructor
@Getter
@Setter
@IdClass(ChiTietCaiDatPK.class)
public class ChiTietCaiDat implements Serializable {
    @Id
    @ManyToOne
    @JoinColumn(name = "mayTinh_id" ,referencedColumnName = "mayTinh_id")
    private MayTinh mayTinh;

    @Id
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "phanMem_id", referencedColumnName = "phanMem_id")
    private PhanMem phanMem;

    private Date ngayCaiDat;
}
