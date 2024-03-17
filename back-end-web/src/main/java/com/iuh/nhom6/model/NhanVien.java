package com.iuh.nhom6.model;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Transactional
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NhanVien implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nhanVien_id")
    private Long id;
    private String hoTenNhanVien;
    private String email;
    private String sdt;
    private Boolean gioiTinh;
    private String diaChi;
    private Boolean trangThai;
    private String image;
}
