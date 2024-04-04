package com.iuh.nhom6.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iuh.nhom6.model.GiangVien;
import com.iuh.nhom6.repository.GiangVienRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin
@RequestMapping("/giangVien")
public class GiangVienController {
    @Autowired
    private GiangVienRepository giangVienRepository;

    @GetMapping("{id}")
    public GiangVien getGiangVienById(@PathVariable Long id) {
        try {
            return giangVienRepository.findById(id).get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;// TODO: handle exception
        }
    }
    
}
