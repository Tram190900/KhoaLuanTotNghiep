package com.iuh.nhom6.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iuh.nhom6.model.GiangVien;


public interface GiangVienRepository extends JpaRepository<GiangVien, Long> {
    GiangVien findGiangVienByTenGiangVienContainingIgnoreCase(String tenGiangVien);
}
