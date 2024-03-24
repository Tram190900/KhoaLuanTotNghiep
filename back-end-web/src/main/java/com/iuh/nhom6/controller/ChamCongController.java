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

    @GetMapping("/getChamCongByNhanVienOnWeek/{id}")
    public List<ChamCong> getChamCongsByNhanVienOnWeek(@PathVariable Long id) {
        try {
            List<ChamCong> chamCongs = chamCongRepository.findChamCongsByNhanVienOnWeek(id);
            return chamCongs;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/getChamCongByNgayTruc/{id}")
    public List<ChamCong> getMethodName(@PathVariable Long id, @RequestParam("startDate") Date startDate,
            @RequestParam("endDate") Date endDate) {
        try {
            return chamCongRepository.findChamCongsByNgayTruc(startDate, endDate, id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // @PostMapping("/saveChamCong")
    // public ChamCong saveChamCong(@RequestBody ChamCong chamCong){
    // PhongMay phongMay =
    // phongMayRepository.findById(chamCong.getPhongMay().getId()).get();
    // NhanVien nhanVien =
    // nhanVienRepository.findById(chamCong.getNhanVien().getId()).get();
    // chamCong.setNhanVien(nhanVien);
    // chamCong.setPhongMay(phongMay);
    // return chamCongRepository.save(chamCong);
    // }
    @PostMapping("/saveChamCong")
    public String postMethodName(@RequestParam("phongMays") List<Long> phongMays,
            @RequestParam("nhanVien") Long nhanVien,
            // @RequestParam("caLam") String caLam,
            @RequestParam("ngayTruc") Date ngayTruc) {
        try {

            phongMays.forEach(phongMayId -> {
                ChamCong chamCong = new ChamCong();
                PhongMay phongMay = phongMayRepository.findById(phongMayId)
                        .orElseThrow(() -> new RuntimeException("PhongMay not found with id: " + phongMayId));

                NhanVien nhanVien1 = nhanVienRepository.findById(nhanVien)
                        .orElseThrow(() -> new RuntimeException("NhanVien not found with id: " + nhanVien));
                // chamCong.setCaLam(caLam);
                chamCong.setNgayTruc(ngayTruc);
                chamCong.setNhanVien(nhanVien1);
                chamCong.setPhongMay(phongMay);
                chamCongRepository.save(chamCong);
            });
        } catch (Exception e) {
            e.printStackTrace();
            return "Error processing the request";
        }

        return "Successfully saved ChamCong";
    }

}
