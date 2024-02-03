package com.iuh.nhom6.repository;

import com.iuh.nhom6.model.ChiTietCaiDat;
import com.iuh.nhom6.model.ChiTietCaiDatPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ChiTietCaiDatRepository extends JpaRepository<ChiTietCaiDat, ChiTietCaiDatPK> {
    @Query(value = "select * from chi_tiet_cai_dat c where c.may_tinh_id = ?1", nativeQuery = true)
    List<ChiTietCaiDat> getAllChiTietCaiDatByMayTinh(Long id);
}
