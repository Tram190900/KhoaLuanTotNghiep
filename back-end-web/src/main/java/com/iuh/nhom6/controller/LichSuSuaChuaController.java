package com.iuh.nhom6.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iuh.nhom6.model.LichSuSuaChua;
import com.iuh.nhom6.repository.LichSuSuaChuaRepository;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@CrossOrigin
@RequestMapping("/lichSuSuaChua")
public class LichSuSuaChuaController {
  @Autowired 
  LichSuSuaChuaRepository lichSuSuaChuaRepository;

  @GetMapping
  public List<LichSuSuaChua> getLichSuSuaChuas() {
    return lichSuSuaChuaRepository.findAll();
  }

  @PostMapping
  public LichSuSuaChua saveLichSuSuaChua(@RequestBody LichSuSuaChua lichSuSuaChua) {
    return lichSuSuaChuaRepository.save(lichSuSuaChua);
  }

  @GetMapping("/top5Phong/{thang}")
  public List<Map<String, Object>> getTop5PhongMayGapLoiTrongThang(@PathVariable int thang) {
      return lichSuSuaChuaRepository.getTop5PhongMayGapLoiTrongThang(thang);
  }
  
  @GetMapping("/phanTramMucDoLoi")
  public Map<String, Object> getPhanTramMucDoLoi() {
      return lichSuSuaChuaRepository.getPhantramMucDoLoi();
  }
  
  @GetMapping("/soLanSuaCuaTungMayTheoPhong/{soPhong}")
  public List<Map<String, Object>> getSoLanSuaTungMayTheoPhong(@PathVariable String soPhong) {
      return lichSuSuaChuaRepository.getSoLanSuaChuaCuaTungMayTheoPhong(soPhong);
  }
  
}
