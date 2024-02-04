package com.iuh.nhom6.repository;

import com.iuh.nhom6.model.ChiTietCaiDatPK;
import com.iuh.nhom6.model.ChiTietLapDat;
import com.iuh.nhom6.model.ChiTietLapDatPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChiTietLapDatRepository extends JpaRepository<ChiTietLapDat, ChiTietLapDatPK> {
    @Query(value = "select * from chi_tiet_lap_dat c where c.may_tinh_id = ?1", nativeQuery = true)
    List<ChiTietLapDat> getAllChiTietLapDatByMayTinh(Long id);
}
