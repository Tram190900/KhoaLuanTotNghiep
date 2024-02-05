package com.iuh.nhom6.repository;

import com.iuh.nhom6.model.ChamCong;
import com.iuh.nhom6.model.NhanVien;
import com.iuh.nhom6.model.PhongMay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChamCongRepository extends JpaRepository<ChamCong, Long> {
    List<ChamCong> findChamCongsByPhongMay(PhongMay phongMay);
    List<ChamCong> findChamCongsByNhanVien(NhanVien nhanVien);
}
