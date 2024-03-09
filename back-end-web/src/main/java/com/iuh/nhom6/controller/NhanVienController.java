package com.iuh.nhom6.controller;

import com.iuh.nhom6.model.NhanVien;
import com.iuh.nhom6.repository.NhanVienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin
public class NhanVienController {
    @Autowired
    private NhanVienRepository nhanVienRepository;
    @GetMapping("/getAllNhanVien")
    public List<NhanVien> getAllNhanVien(){
        return nhanVienRepository.findAll();
    }

    @GetMapping("/getNhanVienByTen/{hoTen}")
    public NhanVien getNhanVienByTen(@PathVariable String hoTen){
        return nhanVienRepository.findNhanVienByHoTenNhanVienContainingIgnoreCase(hoTen);
    }

    @PostMapping("/saveNhanVien")
    public NhanVien saveNhanVien(@RequestBody NhanVien nhanVien){
        return nhanVienRepository.save(nhanVien);
    }

    @PutMapping("/updateNhanVien/{id}")
    public NhanVien updateNhanVien(@RequestBody NhanVien newNhanVien, @PathVariable Long id){
        return nhanVienRepository.findById(id).map(
                nhanVien -> {
                    nhanVien.setHoTenNhanVien(newNhanVien.getHoTenNhanVien());
                    nhanVien.setSdt(newNhanVien.getSdt());
                    nhanVien.setEmail(newNhanVien.getEmail());
                    nhanVien.setDiaChi(newNhanVien.getDiaChi());
                    nhanVien.setGioiTinh(newNhanVien.getGioiTinh());
                    nhanVien.setTrangThai(newNhanVien.getTrangThai());
                    return nhanVienRepository.save(nhanVien);
                }
        ).orElseThrow();
    }

    @GetMapping("/getNhanVienById/{id}")
    public NhanVien getMethodName(@PathVariable Long id) {
        return nhanVienRepository.findById(id).get();
    }
    

}
