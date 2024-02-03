package com.iuh.nhom6.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iuh.nhom6.model.MayTinh;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface MayTinhRepository extends JpaRepository<MayTinh,Long> {
  MayTinh findMayTinhBySoMay(String soMay);

  @Modifying
  @Query(value = "delete from may_tinh mt where mt.may_tinh_id =?1", nativeQuery = true)
  void deleteMayTinhById(Long id);
}
