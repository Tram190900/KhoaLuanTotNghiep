package com.iuh.nhom6.controller;

import com.iuh.nhom6.model.*;
import com.iuh.nhom6.repository.ChiTietLapDatRepository;
import com.iuh.nhom6.repository.MayTinhRepository;
import com.iuh.nhom6.repository.ThietBiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class ChiTietLapDatController {
    @Autowired
    ChiTietLapDatRepository chiTietLapDatRepository;
    @Autowired
    MayTinhRepository mayTinhRepository;
    @Autowired
    ThietBiRepository thietBiRepository;

    @GetMapping("/getAllChiTietLapDat/{id}")
    public List<ChiTietLapDat> getAllChiTietLapDat(@PathVariable Long id){
        return chiTietLapDatRepository.getAllChiTietLapDatByMayTinh(id);
    }
    @PostMapping("/saveChiTietLapDat")
    public ChiTietLapDat saveChiTietLApDat(@RequestBody ChiTietLapDat chiTietLapDat) {
        MayTinh mayTinh = mayTinhRepository.findMayTinhBySoMay(chiTietLapDat.getMayTinh().getSoMay());
        // ThietBi thietBi = thietBiRepository.findById(chiTietLapDat.getThietBi().getId()).get();
        chiTietLapDat.setMayTinh(mayTinh);
        // chiTietLapDat.setThietBi(thietBi);
        return chiTietLapDatRepository.save(chiTietLapDat);
    }

    @PutMapping("capNhapChiTietLapDat/{mayTinh_id}/{thietBi_id}")
    public ChiTietLapDat capNhapChiTietLapDat(@RequestBody ChiTietLapDat newChiTietLapDat, 
    @PathVariable Long mayTinh_id, @PathVariable Long thietBi_id) {
        ChiTietLapDatPK chiTietLapDatPK = new ChiTietLapDatPK(mayTinh_id,thietBi_id);
        return chiTietLapDatRepository.findById(chiTietLapDatPK)
        .map(chiTietLapDat -> {
            chiTietLapDat.setThietBi(newChiTietLapDat.getThietBi());
            return chiTietLapDatRepository.save(chiTietLapDat);
        }).orElseThrow();
    }

    @GetMapping("xemChiTietLapDat/{mayTinh_id}/{thietBi_id}")
    public ChiTietLapDat xemChiTietLapDat( 
    @PathVariable Long mayTinh_id, @PathVariable Long thietBi_id) {
        ChiTietLapDatPK chiTietLapDatPK = new ChiTietLapDatPK(mayTinh_id,thietBi_id);
        return chiTietLapDatRepository.findById(chiTietLapDatPK).get();
    }

    @DeleteMapping("xoaChiTietLapDat/{id}")
    public String xoaChiTietCaiDat(@PathVariable Long id) {
        chiTietLapDatRepository.deleteByStudyId(id);
        return "Ok";
    }
}
