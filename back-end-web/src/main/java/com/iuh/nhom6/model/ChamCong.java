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
public class ChamCong implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chamCong_id")
    private Long id;
    private String caLam;
    private Date ngayTruc;
    @ManyToOne
    @JoinColumn(name = "nhanVien_id")
    private NhanVien nhanVien;
    @ManyToOne
    @JoinColumn(name = "phongMay_id")
    private PhongMay phongMay;
}
