package com.iuh.nhom6.controller;

import com.iuh.nhom6.model.ChamCong;
import com.iuh.nhom6.model.NhanVien;
import com.iuh.nhom6.model.PhongMay;
import com.iuh.nhom6.repository.ChamCongRepository;
import com.iuh.nhom6.repository.NhanVienRepository;
import com.iuh.nhom6.repository.PhongMayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@CrossOrigin
public class ChamCongController {
    @Autowired
    private ChamCongRepository chamCongRepository;
    @Autowired
    private NhanVienRepository nhanVienRepository;
    @Autowired
    private PhongMayRepository phongMayRepository;

    @GetMapping("/getChamCongByNhanVien/{id}")
    public List<ChamCong> getChamCongByNhanVien(@PathVariable Long id) {
        NhanVien nhanVien = nhanVienRepository.findById(id).get();
        return chamCongRepository.findChamCongsByNhanVien(nhanVien);
    }

    @GetMapping("/getChamCongByPhongMay/{id}")
    public List<ChamCong> getChamCongByPhongMay(@PathVariable Long id) {
        PhongMay phongMay = phongMayRepository.findById(id).get();
        return chamCongRepository.findChamCongsByPhongMay(phongMay);
    }

    @PostMapping("/saveChamCong")
    public ChamCong saveChamCong(@RequestBody ChamCong chamCong){
        PhongMay phongMay = phongMayRepository.findById(chamCong.getPhongMay().getId()).get();
        NhanVien nhanVien = nhanVienRepository.findById(chamCong.getNhanVien().getId()).get();
        chamCong.setNhanVien(nhanVien);
        chamCong.setPhongMay(phongMay);
        return chamCongRepository.save(chamCong);
            }
}
