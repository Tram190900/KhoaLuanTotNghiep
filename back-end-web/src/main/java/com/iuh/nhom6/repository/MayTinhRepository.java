package com.iuh.nhom6.repository;

import com.iuh.nhom6.model.PhongMay;
import org.springframework.data.jpa.repository.JpaRepository;

import com.iuh.nhom6.model.MayTinh;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MayTinhRepository extends JpaRepository<MayTinh,Long> {
  MayTinh findMayTinhBySoMayContainingIgnoreCase(String soMay);

    List<MayTinh> findMayTinhsByPhongMay(PhongMay phong);

  @Modifying
  @Query(value = "delete from may_tinh mt where mt.may_tinh_id =?1", nativeQuery = true)
  void deleteMayTinhById(Long id);
}