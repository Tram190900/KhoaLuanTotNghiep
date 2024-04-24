package com.iuh.nhom6.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iuh.nhom6.model.TaiKhoan;
import com.iuh.nhom6.model.GiangVien;
import com.iuh.nhom6.model.NhanVien;


public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, String> {
    TaiKhoan findByNhanVien(NhanVien nhanVien);
    TaiKhoan findByGiangVien(GiangVien giangVien);
}
