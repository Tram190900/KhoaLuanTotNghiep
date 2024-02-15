package com.iuh.nhom6.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iuh.nhom6.model.LoaiPhong;

public interface LoaiPhongRepository extends JpaRepository<LoaiPhong,Long> {
  public LoaiPhong findByTenLoaiPhongAndSoLuongMay(String tenLoaiPhong, int soLuongMay);
}
