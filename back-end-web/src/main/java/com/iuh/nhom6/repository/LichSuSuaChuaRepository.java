package com.iuh.nhom6.repository;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.iuh.nhom6.model.LichSuSuaChua;
import com.iuh.nhom6.model.MayTinh;

public interface LichSuSuaChuaRepository extends JpaRepository<LichSuSuaChua, Long> {

        @Query(value = "SELECT phong_may.so_phong, " +
                        "COUNT(DISTINCT CASE WHEN Date(lich_su_sua_chua.ngay_du_kien_sua) = CURDATE() THEN lich_su_sua_chua.id END) as sua_trong_ngay, "
                        +
                        "COUNT(DISTINCT CASE WHEN Date(lich_su_sua_chua.ngay_du_kien_sua) != CURDATE() THEN lich_su_sua_chua.id END) as sua_ngay_khac "
                        +
                        "FROM computerlab.lich_su_sua_chua " +
                        "LEFT JOIN computerlab.may_tinh ON lich_su_sua_chua.may_tinh_id = may_tinh.may_tinh_id " +
                        "LEFT JOIN computerlab.phong_may ON may_tinh.phong_may_id = phong_may.phong_may_id " +
                        "LEFT JOIN computerlab.toa_nha ON toa_nha.id = phong_may.toa_nha_id " +
                        "WHERE Date(computerlab.lich_su_sua_chua.ngay_gap_loi) BETWEEN ?1 AND ?2 " +
                        "AND computerlab.toa_nha.id = ?3 " +
                        "AND computerlab.lich_su_sua_chua.trang_thai = ?4 " +
                        "GROUP BY phong_may.so_phong ", nativeQuery = true)
        List<Map<String, Object>> getTop5PhongMayGapLoiTrongThang(Date startDay, Date endDate, Long toaNha,
                        Boolean trangThai);

        @Query(value = "SELECT " +
                        "    ROUND((SUM(CASE WHEN muc_do_loi = 1 THEN 1 ELSE 0 END) / COUNT(*) * 100), 2) AS loi_muc_1, "
                        +
                        "    ROUND((SUM(CASE WHEN muc_do_loi = 2 THEN 1 ELSE 0 END) / COUNT(*) * 100), 2) AS loi_muc_2, "
                        +
                        "    ROUND((SUM(CASE WHEN muc_do_loi = 3 THEN 1 ELSE 0 END) / COUNT(*) * 100), 2) AS loi_muc_3 "
                        +
                        "FROM " +
                        "    computerlab.lich_su_sua_chua " +
                        "WHERE " +
                        "    YEAR(lich_su_sua_chua.ngay_gap_loi) = YEAR(CURDATE())", nativeQuery = true)
        Map<String, Object> getPhantramMucDoLoi();

        @Query(value = "SELECT " +
                        "may_tinh.so_may," +
                        "COUNT(lich_su_sua_chua.may_tinh_id) AS so_lan_sua_chua, " +
                        "FROM " +
                        "computerlab.may_tinh " +
                        "LEFT JOIN " +
                        "computerlab.lich_su_sua_chua ON may_tinh.may_tinh_id = lich_su_sua_chua.may_tinh_id " +
                        "LEFT JOIN " +
                        "computerlab.phong_may ON may_tinh.phong_may_id = phong_may.phong_may_id " +
                        "WHERE " +
                        "phong_may.so_phong = ?1 " +
                        "AND computerlab.lich_su_sua_chua.trang_thai = ?2" +
                        "GROUP BY " +
                        "may_tinh.so_may", nativeQuery = true)
        List<Map<String, Object>> getSoLanSuaChuaCuaTungMayTheoPhong(String soPhong, Boolean trangThai);

        @Query(value = "SELECT lich_su_sua_chua.*, may_tinh.so_may, nhan_vien.ho_ten_nhan_vien FROM computerlab.lich_su_sua_chua "
                        +
                        "LEFT JOIN computerlab.may_tinh on may_tinh.may_tinh_id = lich_su_sua_chua.may_tinh_id " +
                        "LEFT JOIN computerlab.phong_may on phong_may.phong_may_id = may_tinh.phong_may_id " +
                        "LEFT JOIN computerlab.nhan_vien on nhan_vien.nhan_vien_id = lich_su_sua_chua.nhan_vien_id " +
                        "where phong_may.so_phong = ?1 " +
                        "and Date(lich_su_sua_chua.ngay_gap_loi) between ?2 and ?3 " +
                        "and lich_su_sua_chua.trang_thai = 0", nativeQuery = true)
        List<Map<String, Object>> getLoiSuaTrongNgayTheoPhongTrongMotKhoangThoiGian(String soPhong, Date startDate,
                        Date endDate);

        @Query(value = "SELECT lich_su_sua_chua.loi_gap_phai, lich_su_sua_chua.ngay_du_kien_sua ,may_tinh.so_may, phong_may.so_phong FROM computerlab.lich_su_sua_chua "
                        +
                        "LEFT JOIN computerlab.may_tinh on may_tinh.may_tinh_id = lich_su_sua_chua.may_tinh_id " +
                        "LEFT JOIN computerlab.phong_may on phong_may.phong_may_id = may_tinh.phong_may_id " +
                        "LEFT JOIN computerlab.nhan_vien on nhan_vien.nhan_vien_id = lich_su_sua_chua.nhan_vien_id " +
                        "where nhan_vien.nhan_vien_id = ?1 " +
                        "and Date(lich_su_sua_chua.ngay_gap_loi) = ?2 " +
                        "and lich_su_sua_chua.trang_thai = 0", nativeQuery = true)
        List<Map<String, Object>> findLoiChuaSuaByNhanVienAndNgayDuKien(Long nhanVien, Date ngayGapLoi);

        @Query(value = "SELECT * " + 
                        "FROM computerlab.lich_su_sua_chua " + 
                        "WHERE lich_su_sua_chua.may_tinh_id = ?1 " + 
                        "AND lich_su_sua_chua.trang_thai = FALSE " + 
                        "ORDER BY lich_su_sua_chua.ngay_gap_loi DESC " + 
                        "LIMIT 1", nativeQuery = true)
        LichSuSuaChua findLoiChuaSuaTheoMayTinhGanNhat(Long mayTinh);
}
