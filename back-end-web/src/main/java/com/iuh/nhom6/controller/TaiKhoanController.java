package com.iuh.nhom6.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.iuh.nhom6.model.TaiKhoan;
import com.iuh.nhom6.repository.TaiKhoanRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin
@RequestMapping("/taikhoan")
public class TaiKhoanController {
    @Autowired 
    private TaiKhoanRepository taiKhoanRepository;

    @GetMapping("/{tenTaiKhoan}")
    public TaiKhoan getTaiKhoanByTen(@PathVariable String tenTaiKhoan) {
        TaiKhoan taiKhoan = taiKhoanRepository.findById(tenTaiKhoan).get();
        taiKhoan.setMatKhau(null); // Loại bỏ trường matKahu
        return taiKhoan;
    }

    @PostMapping("/dangKy")
    public TaiKhoan postMethodName(@RequestBody TaiKhoan taiKhoan) {
        return taiKhoanRepository.save(taiKhoan);
    }
    
}
