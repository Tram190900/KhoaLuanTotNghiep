package com.iuh.nhom6.repository;

import com.iuh.nhom6.model.ThietBi;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ThietBiRepository extends JpaRepository<ThietBi, Long> {
    @Query(value = "SELECT thiet_bi.* FROM computerlab.chi_tiet_lap_dat " +
        "left join computerlab.thiet_bi on thiet_bi.thiet_bi_id = chi_tiet_lap_dat.thiet_bi_id " + 
        "left join computerlab.may_tinh on may_tinh.may_tinh_id=chi_tiet_lap_dat.may_tinh_id " +
        "left join computerlab.phong_may on phong_may.phong_may_id = may_tinh.phong_may_id " +  
        "where phong_may.phong_may_id = 1 " + 
        "group by thiet_bi.thiet_bi_id;", nativeQuery = true)
  public List<ThietBi> findThietBiTheoPhong(Long phongMayId);
}
