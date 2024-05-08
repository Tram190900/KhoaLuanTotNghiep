package com.iuh.nhom6.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iuh.nhom6.model.ChiTietLichSuSuaChua;
import com.iuh.nhom6.model.LichSuSuaChua;
import com.iuh.nhom6.model.MayTinh;
import com.iuh.nhom6.repository.ChiTietLichSuSuaChuaRepository;
import com.iuh.nhom6.repository.LichSuSuaChuaRepository;
import com.iuh.nhom6.repository.MayTinhRepository;

@RestController
@CrossOrigin
@RequestMapping("/chiTietLichSuSuaChua")
public class ChiTietLichSuSuaChuaController {
  @Autowired
  ChiTietLichSuSuaChuaRepository chiTietLichSuSuaChuaRepository;

  @Autowired
  LichSuSuaChuaRepository lichSuSuaChuaRepository;

  @Autowired
  MayTinhRepository mayTinhRepository;

  @PostMapping()
  public ChiTietLichSuSuaChua luuLichSuSuaChua(
      @RequestBody ChiTietLichSuSuaChua chiTietLichSuSuaChua) {
    LichSuSuaChua lichSuSuaChua = lichSuSuaChuaRepository.findById(chiTietLichSuSuaChua.getLichSuSuaChua().getId())
        .get();
    MayTinh mayTinh = mayTinhRepository.findById(lichSuSuaChua.getMayTinh().getId()).get();
    mayTinh.setTrangThai(1);
    mayTinhRepository.save(mayTinh);
    lichSuSuaChua.setTrangThai(true);
    lichSuSuaChuaRepository.save(lichSuSuaChua);

    Date ngayHienTai = new Date(System.currentTimeMillis());
    LocalDate localDateNgayHienTai = ngayHienTai.toLocalDate();
    Date ngayDuKienSua = lichSuSuaChua.getNgayDuKienSua();
    LocalDate localDateNgayDuKienSua = ngayDuKienSua.toLocalDate();
    long khoangCachNgay = ChronoUnit.DAYS.between(localDateNgayDuKienSua, localDateNgayHienTai);

    if (khoangCachNgay >= 1) {
      chiTietLichSuSuaChua
          .setGhiChu(chiTietLichSuSuaChua.getGhiChu() + ", quá ngày dự kiến sửa " + khoangCachNgay + " ngày");
    }

    chiTietLichSuSuaChua.setLichSuSuaChua(lichSuSuaChua);
    return chiTietLichSuSuaChuaRepository.save(chiTietLichSuSuaChua);
  }

  @PostMapping("/hong")
  public ChiTietLichSuSuaChua luuLichSuSuaChuaHong(
      @RequestBody ChiTietLichSuSuaChua chiTietLichSuSuaChua) {
    LichSuSuaChua lichSuSuaChua = lichSuSuaChuaRepository.findById(chiTietLichSuSuaChua.getLichSuSuaChua().getId())
        .get();
    MayTinh mayTinh = mayTinhRepository.findById(lichSuSuaChua.getMayTinh().getId()).get();
    mayTinh.setTrangThai(3);
    mayTinhRepository.save(mayTinh);
    lichSuSuaChua.setTrangThai(true);
    lichSuSuaChuaRepository.save(lichSuSuaChua);
    chiTietLichSuSuaChua.setLichSuSuaChua(lichSuSuaChua);
    return chiTietLichSuSuaChuaRepository.save(chiTietLichSuSuaChua);
  }

  @GetMapping
  public List<ChiTietLichSuSuaChua> xemChiTietLichSuSuaChua() {
    return chiTietLichSuSuaChuaRepository.findAll();
  }

  @DeleteMapping("/{id}")
  public String xoaLichSuSuaChua(@PathVariable Long id) {
    chiTietLichSuSuaChuaRepository.deleteById(id);
    return "Chi tiết lịch sử sửa chữa với id " + id + " đã bị xóa";
  }

  @PutMapping("/{id}")
  public ChiTietLichSuSuaChua capNhapChiTietLichSuSuaChua(
      @PathVariable Long id,
      @RequestBody ChiTietLichSuSuaChua chiTietLichSuSuaChuaMoi) {
    ChiTietLichSuSuaChua chiTietLichSuSuaChua = chiTietLichSuSuaChuaRepository.findById(id).get();
    String soMay_1 = chiTietLichSuSuaChua.getLichSuSuaChua().getMayTinh().getSoMay();
    String soMay_2 = chiTietLichSuSuaChuaMoi.getLichSuSuaChua().getMayTinh().getSoMay();
    if (!soMay_1.equalsIgnoreCase(soMay_2)) {
      MayTinh mayTinh = mayTinhRepository.findBySoMayLikeIgnoreCase(soMay_2);
      chiTietLichSuSuaChuaMoi.getLichSuSuaChua().setMayTinh(mayTinh);
    }
    return chiTietLichSuSuaChuaRepository.findById(id)
        .map((chiTietLichSuSuaChua_2) -> {
          chiTietLichSuSuaChua_2.setNgaySuaLoi(chiTietLichSuSuaChuaMoi.getNgaySuaLoi());
          chiTietLichSuSuaChua_2.setGhiChu(chiTietLichSuSuaChuaMoi.getGhiChu());
          chiTietLichSuSuaChua_2.setLichSuSuaChua(chiTietLichSuSuaChuaMoi.getLichSuSuaChua());
          return chiTietLichSuSuaChuaRepository.save(chiTietLichSuSuaChua_2);
        }).orElseThrow();
  }

  // @PutMapping("/{id}/nhanVien")
  // public ChiTietLichSuSuaChua capNhapNhanVienSuaChua(
  // @PathVariable Long id,
  // @RequestBody ChiTietLichSuSuaChua chiTietLichSuSuaChuaMoi) {
  // return chiTietLichSuSuaChuaRepository.findById(id)
  // .map((chiTietLichSuSuaChua) -> {
  // chiTietLichSuSuaChua.setNgaySuaLoi(chiTietLichSuSuaChuaMoi.getNgaySuaLoi());
  // chiTietLichSuSuaChua.setNhanVien(chiTietLichSuSuaChuaMoi.getNhanVien());
  // return chiTietLichSuSuaChuaRepository.save(chiTietLichSuSuaChua);
  // }).orElseThrow();

  // }

  @GetMapping("/{mayTinhId}")
  public List<Map<String, Object>> getChiTietLichSuSuaLoiDTOs(@PathVariable Long mayTinhId) {
    try {
      List<Map<String, Object>> resultList = chiTietLichSuSuaChuaRepository.findChiTietLichSuTheoMay(mayTinhId);
      return resultList;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }

  }

  @GetMapping("/getByPhongMay/{id}")
  public List<Map<String, Object>> getChiTietLichSuSuaLoiDTOsByPhongMay(@PathVariable Long id) {
    try {
      List<Map<String, Object>> resultList = chiTietLichSuSuaChuaRepository.findChiTietLichSuTheoPhong(id);
      return resultList;
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  @PostMapping("/filterLichSuLoi")
  public List<Map<String, Object>> filterLichSuLoi(@RequestParam("phongMayId") Long phongMayId,
      @RequestParam("ngayGapLoi") Date ngayGapLoi, @RequestParam("ngayDuKienSua") Date ngayDuKienSua,
      @RequestParam("trangThai") Boolean trangThai) {
    // TODO: process POST request
    try {
      return chiTietLichSuSuaChuaRepository.filterLichSuLoi(phongMayId, ngayGapLoi, ngayDuKienSua, trangThai);
    } catch (Exception e) {
      e.printStackTrace();
      return null;// TODO: handle exception
    }
  }

  @GetMapping("/getLoiQuaHanTheoNhanVien/{id}")
  public List<Map<String, Object>> findChiTietSuaTheoLoiQuaHanSuaCuaNhanVien(@PathVariable Long id) {
      return chiTietLichSuSuaChuaRepository.findChiTietSuaTheoLoiQuaHanSuaCuaNhanVien(id);
  }
  
}
