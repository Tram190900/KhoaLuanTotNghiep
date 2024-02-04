package com.iuh.nhom6.controller;

import com.iuh.nhom6.model.ThietBi;
import com.iuh.nhom6.repository.ThietBiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class ThietBiController {
    @Autowired
    private ThietBiRepository thietBiRepository;
    @GetMapping("/getAllThietBi")
    public List<ThietBi> getAllThietBi(){
        return thietBiRepository.findAll();
    }
}
