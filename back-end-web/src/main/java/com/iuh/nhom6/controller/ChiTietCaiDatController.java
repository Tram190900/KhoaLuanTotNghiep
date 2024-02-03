package com.iuh.nhom6.controller;

import com.iuh.nhom6.model.ChiTietCaiDat;
import com.iuh.nhom6.model.MayTinh;
import com.iuh.nhom6.model.PhanMem;
import com.iuh.nhom6.repository.ChiTietCaiDatRepository;
import com.iuh.nhom6.repository.MayTinhRepository;
import com.iuh.nhom6.repository.PhanMemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
public class ChiTietCaiDatController {
    @Autowired
    private ChiTietCaiDatRepository chiTietCaiDatRepository;
    @Autowired
    private PhanMemRepository phanMemRepository;
    @Autowired
    private MayTinhRepository mayTinhRepository;

    @GetMapping("/getChiTietCaiDat/{id}")
    public List<ChiTietCaiDat> getPhanMemTheoMay(@PathVariable Long id){
        return chiTietCaiDatRepository.getAllChiTietCaiDatByMayTinh(id);
    }

    @PostMapping("/saveChiTietCaiDat}")
    public ChiTietCaiDat saveChiTietCaiDat(@RequestBody ChiTietCaiDat chiTietCaiDat){
        PhanMem phanMem = phanMemRepository.findById(chiTietCaiDat.getPhanMem().getId()).get();
        MayTinh mayTinh = mayTinhRepository.findById(chiTietCaiDat.getMayTinh().getId()).get();
        chiTietCaiDat.setMayTinh(mayTinh);
        chiTietCaiDat.setPhanMem(phanMem);
        return chiTietCaiDatRepository.save(chiTietCaiDat);
    }
}
