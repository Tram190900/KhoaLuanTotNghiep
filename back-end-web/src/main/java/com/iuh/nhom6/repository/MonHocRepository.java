package com.iuh.nhom6.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iuh.nhom6.model.MonHoc;
import com.iuh.nhom6.model.PhanMem;

public interface MonHocRepository extends JpaRepository<MonHoc,Long> {
  List<MonHoc> findByPhanMemsContaining(PhanMem softwares);
}