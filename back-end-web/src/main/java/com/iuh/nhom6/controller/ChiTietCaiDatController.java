package com.iuh.nhom6.controller;

import com.iuh.nhom6.model.ChiTietCaiDat;
import com.iuh.nhom6.model.ChiTietCaiDatPK;
import com.iuh.nhom6.model.ChiTietLapDatPK;
import com.iuh.nhom6.model.LoaiPhong;
import com.iuh.nhom6.model.MayTinh;
import com.iuh.nhom6.model.PhanMem;
import com.iuh.nhom6.repository.ChiTietCaiDatRepository;
import com.iuh.nhom6.repository.MayTinhRepository;
import com.iuh.nhom6.repository.PhanMemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public List<ChiTietCaiDat> getPhanMemTheoMay(@PathVariable Long id) {
        return chiTietCaiDatRepository.getAllChiTietCaiDatByMayTinh(id);
    }

    @PostMapping("/saveChiTietCaiDat")
    public ChiTietCaiDat saveChiTietCaiDat(@RequestBody ChiTietCaiDat chiTietCaiDat) {
        MayTinh mayTinh = mayTinhRepository.findMayTinhBySoMay(chiTietCaiDat.getMayTinh().getSoMay());
        // PhanMem phanMem = phanMemRepository.findById(chiTietCaiDat.getPhanMem().getId()).get();
        chiTietCaiDat.setMayTinh(mayTinh);
        // chiTietCaiDat.setPhanMem(phanMem);
        return chiTietCaiDatRepository.save(chiTietCaiDat);
    }

    @PutMapping("capNhapChiTietCaiDat/{mayTinh_id}/{phanMem_id}")
    public ChiTietCaiDat capNhapChiTietCaiDat(@RequestBody ChiTietCaiDat newChiTietCaiDat, 
    @PathVariable Long mayTinh_id, @PathVariable Long phanMem_id) {
        ChiTietCaiDatPK chiTietCaiDatPK = new ChiTietCaiDatPK(mayTinh_id,phanMem_id);
        return chiTietCaiDatRepository.findById(chiTietCaiDatPK)
        .map(chiTietCaiDat -> {
            chiTietCaiDat.setPhanMem(newChiTietCaiDat.getPhanMem());
            chiTietCaiDat.setNgayCaiDat(newChiTietCaiDat.getNgayCaiDat());
            return chiTietCaiDatRepository.save(chiTietCaiDat);
        }).orElseThrow();
    }

    @GetMapping("xemChiTietCaiDat/{mayTinh_id}/{phanMem_id}")
    public ChiTietCaiDat xemChiTietCaiDat( 
    @PathVariable Long mayTinh_id, @PathVariable Long phanMem_id) {
        ChiTietCaiDatPK chiTietCaiDatPK = new ChiTietCaiDatPK(mayTinh_id,phanMem_id);
        return chiTietCaiDatRepository.findById(chiTietCaiDatPK).get();
    }

    @DeleteMapping("xoaChiTietCaiDat/{id}")
    public String xoaChiTietCaiDat(@PathVariable Long id) {
        chiTietCaiDatRepository.deleteByStudyId(id);
        return "Ok";
    }
}
