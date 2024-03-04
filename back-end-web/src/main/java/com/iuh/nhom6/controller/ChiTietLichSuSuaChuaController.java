package com.iuh.nhom6.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iuh.nhom6.model.ChiTietLichSuSuaChua;
import com.iuh.nhom6.model.MayTinh;
import com.iuh.nhom6.repository.ChiTietLichSuSuaChuaRepository;
import com.iuh.nhom6.repository.MayTinhRepository;

@RestController
@CrossOrigin
@RequestMapping("/chiTietLichSuSuaChua")
public class ChiTietLichSuSuaChuaController {
  @Autowired 
  ChiTietLichSuSuaChuaRepository chiTietLichSuSuaChuaRepository;

  @Autowired
  MayTinhRepository mayTinhRepository;

  @PostMapping()
  public ChiTietLichSuSuaChua luuLichSuSuaChua(
    @RequestBody ChiTietLichSuSuaChua chiTietLichSuSuaChua) {
    MayTinh mayTinh = mayTinhRepository.findBySoMayLikeIgnoreCase(chiTietLichSuSuaChua.getLichSuSuaChua().getMayTinh().getSoMay());
    chiTietLichSuSuaChua.getLichSuSuaChua().setMayTinh(mayTinh);
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

  @PutMapping("/{id}/nhanVien")
  public ChiTietLichSuSuaChua capNhapNhanVienSuaChua(
    @PathVariable Long id,
    @RequestBody ChiTietLichSuSuaChua chiTietLichSuSuaChuaMoi) {
      return chiTietLichSuSuaChuaRepository.findById(id)
      .map((chiTietLichSuSuaChua) -> {
        chiTietLichSuSuaChua.setNgaySuaLoi(chiTietLichSuSuaChuaMoi.getNgaySuaLoi());
        chiTietLichSuSuaChua.setNhanVien(chiTietLichSuSuaChuaMoi.getNhanVien());
        return chiTietLichSuSuaChuaRepository.save(chiTietLichSuSuaChua);
      }).orElseThrow();
      
  }
}