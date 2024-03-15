package com.iuh.nhom6.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.iuh.nhom6.model.LichSuSuaChua;

public interface LichSuSuaChuaRepository extends JpaRepository<LichSuSuaChua, Long> {

    @Query(value = "SELECT phong_may.so_phong, COUNT(*) AS soLanSuaChua " +
            "FROM computerlab.lich_su_sua_chua " +
            "LEFT JOIN computerlab.may_tinh ON lich_su_sua_chua.may_tinh_id = may_tinh.may_tinh_id " +
            "LEFT JOIN computerlab.phong_may ON may_tinh.phong_may_id = phong_may.phong_may_id " +
            "WHERE MONTH(lich_su_sua_chua.ngay_gap_loi) = ?1 " +
            "GROUP BY phong_may.so_phong " +
            "ORDER BY soLanSuaChua DESC " +
            "LIMIT 5", nativeQuery = true)
    List<Map<String, Object>> getTop5PhongMayGapLoiTrongThang(int thang);
}