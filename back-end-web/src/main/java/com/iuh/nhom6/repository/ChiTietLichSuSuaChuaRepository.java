package com.iuh.nhom6.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.iuh.nhom6.model.ChiTietLichSuSuaChua;

public interface ChiTietLichSuSuaChuaRepository extends JpaRepository<ChiTietLichSuSuaChua, Long> {

    @Query(value = "SELECT lich_su_sua_chua.*, chi_tiet_lich_su_sua_chua.*, may_tinh.so_may " +
            "FROM computerlab.lich_su_sua_chua " +
            "LEFT JOIN computerlab.chi_tiet_lich_su_sua_chua " +
            "ON lich_su_sua_chua.id = chi_tiet_lich_su_sua_chua.lich_su_sua_chua_id " +
            "LEFT JOIN computerlab.may_tinh ON may_tinh.may_tinh_id = lich_su_sua_chua.may_tinh_id " +
            "WHERE may_tinh.may_tinh_id = ?1", nativeQuery = true)
    List<Map<String, Object>> findChiTietLichSuTheoMay(Long mayTinhId);

    @Query(value = "SELECT lich_su_sua_chua.*, chi_tiet_lich_su_sua_chua.*, may_tinh.so_may " +
            "FROM computerlab.lich_su_sua_chua " +
            "LEFT JOIN computerlab.chi_tiet_lich_su_sua_chua ON lich_su_sua_chua.id = chi_tiet_lich_su_sua_chua.lich_su_sua_chua_id "
            +
            "LEFT JOIN computerlab.may_tinh ON may_tinh.may_tinh_id = lich_su_sua_chua.may_tinh_id " +
            "WHERE may_tinh.phong_may_id = ?1", nativeQuery = true)
    List<Map<String, Object>> findChiTietLichSuTheoPhong(Long phongMayId);
}
