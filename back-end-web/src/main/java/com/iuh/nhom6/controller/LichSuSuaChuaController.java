package com.iuh.nhom6.controller;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iuh.nhom6.model.LichSuSuaChua;
import com.iuh.nhom6.model.NhanVien;
import com.iuh.nhom6.repository.LichSuSuaChuaRepository;
import com.iuh.nhom6.repository.MayTinhRepository;
import com.iuh.nhom6.repository.NhanVienRepository;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin
@RequestMapping("/lichSuSuaChua")
public class LichSuSuaChuaController {
  @Autowired
  LichSuSuaChuaRepository lichSuSuaChuaRepository;

  @Autowired
  NhanVienRepository nhanVienRepository;

  @Autowired
  MayTinhRepository mayTinhRepository;

  @GetMapping
  public List<LichSuSuaChua> getLichSuSuaChuas() {
    return lichSuSuaChuaRepository.findAll();
  }

  @PostMapping
  public LichSuSuaChua saveLichSuSuaChua(@RequestBody LichSuSuaChua lichSuSuaChua) {
    return lichSuSuaChuaRepository.save(lichSuSuaChua);
  }

  @PostMapping("/top5Phong")
  public List<Map<String, Object>> getTop5PhongMayGapLoiTrongThang(@RequestParam("startDate") Date startDate,
      @RequestParam("endDate") Date endDate,
      @RequestParam("toaNha") Long toaNha,
      @RequestParam("trangThai") Boolean trangThai) {
    return lichSuSuaChuaRepository.getTop5PhongMayGapLoiTrongThang(startDate, endDate, toaNha, trangThai);
  }

  @GetMapping("/phanTramMucDoLoi")
  public Map<String, Object> getPhanTramMucDoLoi() {
    return lichSuSuaChuaRepository.getPhantramMucDoLoi();
  }

  @PostMapping("/soLanSuaCuaTungMayTheoPhong")
  public List<Map<String, Object>> getSoLanSuaTungMayTheoPhong(@RequestParam String soPhong,
      @RequestParam Boolean trangThai) {
    try {
      return lichSuSuaChuaRepository.getSoLanSuaChuaCuaTungMayTheoPhong(soPhong, trangThai);
    } catch (Exception e) {
      e.printStackTrace();
      return null;
      // TODO: handle exception
    }
  }

  @PostMapping("/loiPhaiSuaTheoPhong")
  public List<Map<String, Object>> getLoiSuaTrongNgayTheoPhongTrongMotKhoangThoiGian(
      @RequestParam("soPhong") String soPhong, @RequestParam("startDate") Date startDate,
      @RequestParam("endDate") Date endDate) {
    try {
      return lichSuSuaChuaRepository.getLoiSuaTrongNgayTheoPhongTrongMotKhoangThoiGian(soPhong, startDate, endDate);
    } catch (Exception e) {
      e.printStackTrace();// TODO: handle exception
      return null;
    }
  }

  @PutMapping("/updateNhanVienSua/{id}")
  public LichSuSuaChua updateNhanVienSua(@PathVariable Long id, @RequestParam("nhanVienId") Long nhanVienId) {
    try {

      LichSuSuaChua lichSuSuaChua = lichSuSuaChuaRepository.findById(id).get();
      NhanVien nhanVien = nhanVienRepository.findById(nhanVienId).get();
      lichSuSuaChua.setNhanVien(nhanVien);
      return lichSuSuaChuaRepository.save(lichSuSuaChua);
    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
      return null;
    }
  }

  @PostMapping("/getLoiChuaSuaTheoNhanVienVaNgayDuKien/{id}")
  public List<Map<String, Object>> getLoiByNhanVienAndNgayDuKien(@PathVariable Long id,
      @RequestParam("ngayGapLoi") Date ngayGapLoi) {
    try {
      return lichSuSuaChuaRepository.findLoiChuaSuaByNhanVienAndNgayDuKien(id, ngayGapLoi);
    } catch (Exception e) {
      e.printStackTrace();
      return null;// TODO: handle exception
    }
  }

  @GetMapping("/getLoiChuaSuaTheoMayTinhGanNhat/{id}")
  public LichSuSuaChua getLoiChuaSuaTheoMayTinhGanNhat(@PathVariable Long id) {
      try {
        return lichSuSuaChuaRepository.findLoiChuaSuaTheoMayTinhGanNhat(id);
      } catch (Exception e) {
        e.printStackTrace();
        return null;// TODO: handle exception
      }
  }
  
  @GetMapping("/getLoiChuaSuaTheoNhanVien/{id}")
  public List<Map<String, Object>> getLoiChuaSuaTheoNhanVien(@PathVariable Long id) {
      try {
        return lichSuSuaChuaRepository.findLoiChuSuaTheoNhanVien(id);
      } catch (Exception e) {
        e.printStackTrace();
        return null;// TODO: handle exception
      }
  }
  
  
}
