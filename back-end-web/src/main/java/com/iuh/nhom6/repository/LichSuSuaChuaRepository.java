package com.iuh.nhom6.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.iuh.nhom6.model.LichSuSuaChua;

public interface LichSuSuaChuaRepository extends JpaRepository<LichSuSuaChua, Long> {

        @Query(value = "SELECT phong_may.so_phong, COUNT(*) AS so_lan_sua_chua " +
                        "FROM computerlab.lich_su_sua_chua " +
                        "LEFT JOIN computerlab.may_tinh ON lich_su_sua_chua.may_tinh_id = may_tinh.may_tinh_id " +
                        "LEFT JOIN computerlab.phong_may ON may_tinh.phong_may_id = phong_may.phong_may_id " +
                        "WHERE MONTH(lich_su_sua_chua.ngay_gap_loi) = ?1 " +
                        "GROUP BY phong_may.so_phong " +
                        "ORDER BY so_lan_sua_chua DESC " +
                        "LIMIT 5", nativeQuery = true)
        List<Map<String, Object>> getTop5PhongMayGapLoiTrongThang(int thang);

        @Query(value = "SELECT " +
                        "    ROUND((SUM(CASE WHEN muc_do_loi = 1 THEN 1 ELSE 0 END) / COUNT(*) * 100), 2) AS loi_muc_1, "
                        +
                        "    ROUND((SUM(CASE WHEN muc_do_loi = 2 THEN 1 ELSE 0 END) / COUNT(*) * 100), 2) AS loi_muc_2, "
                        +
                        "    ROUND((SUM(CASE WHEN muc_do_loi = 3 THEN 1 ELSE 0 END) / COUNT(*) * 100), 2) AS loi_muc_3 "
                        +
                        "FROM " +
                        "    computerlab.lich_su_sua_chua\n" +
                        "WHERE " +
                        "    YEAR(lich_su_sua_chua.ngay_gap_loi) = YEAR(CURDATE())", nativeQuery = true)
        Map<String, Object> getPhantramMucDoLoi();

        @Query(value = "SELECT " +
                        "may_tinh.so_may," +
                        "COUNT(lich_su_sua_chua.may_tinh_id) AS so_lan_sua_chua, " +
                        "SUM(CASE WHEN lich_su_sua_chua.muc_do_loi = 1 THEN 1 ELSE 0 END) AS so_lan_loi_muc_1, "+
                        "SUM(CASE WHEN lich_su_sua_chua.muc_do_loi = 2 THEN 1 ELSE 0 END) AS so_lan_loi_muc_2, "+
                        "SUM(CASE WHEN lich_su_sua_chua.muc_do_loi = 3 THEN 1 ELSE 0 END) AS so_lan_loi_muc_3 "+
                        "FROM " +
                        "computerlab.may_tinh " +
                        "LEFT JOIN " +
                        "computerlab.lich_su_sua_chua ON may_tinh.may_tinh_id = lich_su_sua_chua.may_tinh_id " +
                        "LEFT JOIN " +
                        "computerlab.phong_may ON may_tinh.phong_may_id = phong_may.phong_may_id " +
                        "WHERE " +
                        "phong_may.so_phong = ?1 " +
                        "GROUP BY " +
                        "may_tinh.so_may", nativeQuery = true)
        List<Map<String, Object>> getSoLanSuaChuaCuaTungMayTheoPhong(String soPhong);
}
