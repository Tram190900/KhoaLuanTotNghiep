package com.iuh.nhom6.repository;

import com.iuh.nhom6.model.PhongMay;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.iuh.nhom6.model.MayTinh;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MayTinhRepository extends JpaRepository<MayTinh,Long> {
  MayTinh findMayTinhBySoMayContainingIgnoreCase(String soMay);
  MayTinh findBySoMayLikeIgnoreCase(String soMay);

    List<MayTinh> findMayTinhsByPhongMay(PhongMay phong);

  @Modifying
  @Query(value = "delete from may_tinh mt where mt.may_tinh_id =?1", nativeQuery = true)
  void deleteMayTinhById(Long id);

  public MayTinh findMayTinhBySoMay(String soMay);

  Page<MayTinh> findMayTinhByPhongMay(PhongMay phongMay, PageRequest pageRequest);
  Page<MayTinh> findMayTinhByTrangThai(int trangThai, PageRequest pageRequest);
}
