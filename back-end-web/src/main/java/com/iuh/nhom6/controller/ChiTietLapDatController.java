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
}
