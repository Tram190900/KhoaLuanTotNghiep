package com.iuh.nhom6.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaiKhoan {
    @Id
    private String tenTaiKhoan;
    private String matKhau;
    private String role;

    @OneToOne
    @JoinColumn(name = "nhanVien_id")
    private NhanVien nhanVien;
}
