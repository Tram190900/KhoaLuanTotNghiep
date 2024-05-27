package com.iuh.nhom6.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.iuh.nhom6.model.PhongMay;
import com.iuh.nhom6.model.ToaNha;

public interface PhongMayRepository extends JpaRepository<PhongMay, Long> {
  PhongMay findPhongMayBySoPhong(String soPhong);

  @Query(value = "select DISTINCT toa_nha from phong_may", nativeQuery = true)
  List<String> findToaNha();

  List<PhongMay> findPhongMaysByToaNha(ToaNha toaNha);

  Page<PhongMay> findPhongMayByToaNha(ToaNha toaNha, PageRequest pageRequest);

}
