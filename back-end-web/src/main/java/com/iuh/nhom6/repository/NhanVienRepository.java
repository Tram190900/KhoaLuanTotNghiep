package com.iuh.nhom6.repository;

import com.iuh.nhom6.model.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NhanVienRepository extends JpaRepository<NhanVien, Long> {
    NhanVien findNhanVienByHoTenNhanVienContainingIgnoreCase(String hoTen);
}
