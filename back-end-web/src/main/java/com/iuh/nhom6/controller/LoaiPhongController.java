package com.iuh.nhom6.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iuh.nhom6.model.LoaiPhong;
import com.iuh.nhom6.repository.LoaiPhongRepository;

@RestController
@CrossOrigin
@RequestMapping("/loaiPhong")
public class LoaiPhongController {
  @Autowired
  LoaiPhongRepository loaiPhongRepository;

  @GetMapping
  public List<LoaiPhong> xemDanhSachLoaiPhong() {
    return loaiPhongRepository.findAll();
  }

  @GetMapping("/{tenLoaiPhong}/{soLuongMay}")
  public LoaiPhong timLoaiPhongTheoTen(
    @PathVariable String tenLoaiPhong,
    @PathVariable int soLuongMay) {
    return loaiPhongRepository.findByTenLoaiPhongAndSoLuongMay(tenLoaiPhong, soLuongMay);
  }
  @PostMapping
  public LoaiPhong luuLoaiPhong (@RequestBody LoaiPhong loaiPhong) {
    return loaiPhongRepository.save(loaiPhong);
  }
}
