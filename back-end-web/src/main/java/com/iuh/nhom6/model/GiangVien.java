package com.iuh.nhom6.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Transactional
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GiangVien implements Serializable {
    @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "giangVien_id")
    private Long id;
    private String tenGiangVien;
    private String email;
    private String sdt;
    private Boolean gioiTinh;
    private String diaChi;
    private Boolean trangThai;
    private String image;
}
