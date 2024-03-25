package com.iuh.nhom6.repository;

import com.iuh.nhom6.model.ChamCong;
import com.iuh.nhom6.model.NhanVien;
import com.iuh.nhom6.model.PhongMay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;

public interface ChamCongRepository extends JpaRepository<ChamCong, Long> {
    List<ChamCong> findChamCongsByPhongMay(PhongMay phongMay);

    List<ChamCong> findChamCongsByNhanVien(NhanVien nhanVien);

    @Query(value = "SELECT * FROM cham_cong WHERE Date(ngay_truc) BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE() AND nhan_vien_id =?1", nativeQuery = true)
    List<ChamCong> findChamCongsByNhanVienOnWeek(Long nhanVienId);

    @Query(value = "SELECT * FROM computerlab.cham_cong WHERE nhan_vien_id =?3 AND (Date(ngay_truc) BETWEEN ?1 AND ?2)", nativeQuery = true)
    List<ChamCong> findChamCongsByNgayTruc(Date startDate, Date endDate, Long nhanVienId);

    @Query(value = "SELECT * from computerlab.cham_cong " +
            "where cham_cong.nhan_vien_id= ?1 and Date(cham_cong.ngay_truc) = ?2", nativeQuery = true)
    List<ChamCong> findChamCongByNgayTrucAndNhanVien(Long nhanVienId,Date ngayTruc );
}
