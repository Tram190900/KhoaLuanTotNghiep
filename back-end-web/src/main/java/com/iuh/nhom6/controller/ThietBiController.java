package com.iuh.nhom6.controller;

import com.iuh.nhom6.model.ThietBi;
import com.iuh.nhom6.repository.ThietBiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin
public class ThietBiController {
    @Autowired
    private ThietBiRepository thietBiRepository;
    @GetMapping("/getAllThietBi")
    public List<ThietBi> getAllThietBi(){
        return thietBiRepository.findAll();
    }

    @PostMapping("/saveThietBi")
    public ThietBi saveThietBi(@RequestBody ThietBi thietBi){
        return thietBiRepository.save(thietBi);
    }

    @PutMapping("/updateThietBi/{id}")
    public ThietBi updateThietBi(@RequestBody ThietBi newThietBi, @PathVariable Long id){
        return thietBiRepository.findById(id).map(
                thietBi -> {
                    thietBi.setTenThietBi(newThietBi.getTenThietBi());
                    thietBi.setSoLuong(newThietBi.getSoLuong());
                    thietBi.setDonVi(newThietBi.getDonVi());
                    return thietBiRepository.save(thietBi);
                }
        ).orElseThrow();
    }

    @GetMapping("/getThietBiTheoPhong/{id}")
    public List<ThietBi> getThietBiTheoPhong(@PathVariable Long id) {
        return thietBiRepository.findThietBiTheoPhong(id);
    }
    
}
