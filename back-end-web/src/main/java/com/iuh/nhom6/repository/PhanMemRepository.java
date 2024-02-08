package com.iuh.nhom6.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iuh.nhom6.model.PhanMem;

public interface PhanMemRepository extends JpaRepository<PhanMem,Long> {
  public List<PhanMem> findByTenPhamMemContaining(String softwareName);
}
