package com.iuh.nhom6.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.iuh.nhom6.model.LoaiPhong;
import com.iuh.nhom6.model.NhanVien;
import com.iuh.nhom6.model.PhongMay;
import com.iuh.nhom6.model.ToaNha;
import com.iuh.nhom6.repository.LoaiPhongRepository;
import com.iuh.nhom6.repository.NhanVienRepository;
import com.iuh.nhom6.repository.PhongMayRepository;
import com.iuh.nhom6.repository.ToaNhaRepository;


@RestController
@CrossOrigin
public class PhongMayController {
  @Autowired
  private PhongMayRepository phongMayRepository;

  @Autowired
  private LoaiPhongRepository loaiPhongRepository;

  @Autowired
  private ToaNhaRepository toaNhaRepository;

  @Autowired
  private NhanVienRepository nhanVienRepository;

  @PostMapping("/savePhongMay")
  public PhongMay savePhongMay(@RequestBody PhongMay phongMay) {
    LoaiPhong loaiPhong = phongMay.getLoaiPhong();
    NhanVien nhanVien = nhanVienRepository.findById(phongMay.getNhanVien().getId()).get();
    try {
      loaiPhongRepository.save(loaiPhong);
      return phongMayRepository.save(phongMay);
    } catch (Exception e) {
      loaiPhong = loaiPhongRepository
          .findByTenLoaiPhongAndSoLuongMay(loaiPhong.getTenLoaiPhong(),
              loaiPhong.getSoLuongMay());
      phongMay.setLoaiPhong(loaiPhong);
      phongMay.setNhanVien(nhanVien);
      return phongMayRepository.save(phongMay);
    }
  }

  @GetMapping("/getAllPhongMay")
  public List<PhongMay> getAllPhongMay() {
    return phongMayRepository.findAll();
  }

  @GetMapping("/getPhongMayById/{id}")
  public PhongMay getPhongMayById(@PathVariable Long id) {
    return phongMayRepository.findById(id).get();
  }

  @PutMapping("/updatePhongMay/{id}")
  public PhongMay updatePhongMay(@RequestBody PhongMay newPhongMay, @PathVariable Long id) {
    return phongMayRepository.findById(id)
        .map(phongMay -> {
          phongMay.setSoPhong(newPhongMay.getSoPhong());
          phongMay.setToaNha(newPhongMay.getToaNha());
          phongMay.setLoaiPhong(newPhongMay.getLoaiPhong());
          phongMay.setNhanVien(newPhongMay.getNhanVien());
          try {
            loaiPhongRepository.save(newPhongMay.getLoaiPhong());
            return phongMayRepository.save(phongMay);
          } catch (Exception e) {
            LoaiPhong loaiPhong_2 = loaiPhongRepository
                .findByTenLoaiPhongAndSoLuongMay(newPhongMay.getLoaiPhong().getTenLoaiPhong(),
                    newPhongMay.getLoaiPhong().getSoLuongMay());
            phongMay.setLoaiPhong(loaiPhong_2);
            return phongMayRepository.save(phongMay);
          }
        }).orElseThrow();
  }

  @DeleteMapping("/deletePhongMay/{id}")
  String deletePhongMay(@PathVariable Long id) {
    phongMayRepository.deleteById(id);
    return "Phong may with id " + id + " has been deleted success.";
  }

  @GetMapping("/getAllToaNha")
  public List<String> getAllToaNha() {
    List<String> toaNhaList = phongMayRepository.findToaNha();
    return toaNhaList;
  }

  @GetMapping("/getPhongMay/{toaNha}")
  public List<PhongMay> getMethodName(@PathVariable ToaNha toaNha) {
    List<PhongMay> phongMays = phongMayRepository.findPhongMaysByToaNha(toaNha);
      return phongMays;
  }

  @GetMapping("/xemDanhSachPhongMayTheoToaNha/{id}") 
  public List<PhongMay> xemDanhSachPhongMayTheoToaNha(@PathVariable Long id) {
    ToaNha toaNha = toaNhaRepository.findById(id).get();
    return phongMayRepository.findPhongMaysByToaNha(toaNha);
  }

  @GetMapping("/phongmay/{id}/phantrang/{offset}/{pageSize}")
  public Page<PhongMay> xemDanhSachPhongMayPhanTrang(@PathVariable Long id,@PathVariable int offset, @PathVariable int pageSize) {
    ToaNha toaNha = toaNhaRepository.findById(id).get();
    return phongMayRepository.findPhongMayByToaNha(toaNha, PageRequest.of(offset, pageSize));
  }

  @GetMapping("/phongMayBySoPhong/{soPhong}")
  public PhongMay getPhongMayBySoPhongMay(@PathVariable String soPhong) {
      return phongMayRepository.findPhongMayBySoPhong(soPhong);
  }
  
}
