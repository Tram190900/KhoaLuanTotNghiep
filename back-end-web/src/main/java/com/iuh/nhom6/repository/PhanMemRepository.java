package com.iuh.nhom6.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.iuh.nhom6.model.PhanMem;

public interface PhanMemRepository extends JpaRepository<PhanMem,Long> {
  public List<PhanMem> findByTenPhamMemContaining(String softwareName);

  @Query(value = "SELECT phan_mem.* FROM computerlab.chi_tiet_cai_dat " +
        "left join computerlab.phan_mem on phan_mem.phan_mem_id = chi_tiet_cai_dat.phan_mem_id " + 
        "left join computerlab.may_tinh on may_tinh.may_tinh_id=chi_tiet_cai_dat.may_tinh_id " +
        "left join computerlab.phong_may on phong_may.phong_may_id = may_tinh.phong_may_id " +  
        "where phong_may.phong_may_id = 1 " + 
        "group by phan_mem.phan_mem_id;", nativeQuery = true)
  public List<PhanMem> findPhanMemTheoPhong(Long phongMayId);
}
