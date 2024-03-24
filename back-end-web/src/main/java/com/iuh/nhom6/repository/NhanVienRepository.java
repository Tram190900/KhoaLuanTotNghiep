package com.iuh.nhom6.repository;

import com.iuh.nhom6.model.NhanVien;

import java.sql.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NhanVienRepository extends JpaRepository<NhanVien, Long> {
    NhanVien findNhanVienByHoTenNhanVienContainingIgnoreCase(String hoTen);

    @Query(value="SELECT nhan_vien.* FROM computerlab.nhan_vien " + 
                "left join computerlab.cham_cong on cham_cong.nhan_vien_id = nhan_vien.nhan_vien_id " + 
                "left join computerlab.phong_may on phong_may.phong_may_id = cham_cong.phong_may_id " + 
                "where cham_cong.ngay_truc = ?1 and phong_may.phong_may_id = ?2", nativeQuery = true)
    NhanVien findNhanVienByNgayTrucAndPhongMay(Date ngayTruc, Long phongMay);
}
