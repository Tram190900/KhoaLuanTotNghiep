package com.iuh.nhom6.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.iuh.nhom6.model.PhongMay;
import com.iuh.nhom6.repository.PhongMayRepository;

@RestController
@CrossOrigin
public class PhongMayController {
  @Autowired 
  private PhongMayRepository phongMayRepository;

  @PostMapping("/savePhongMay")
  public PhongMay savePhongMay(@RequestBody PhongMay phongMay) {
    return phongMayRepository.save(phongMay);
  }

  @GetMapping("/getAllPhongMay")
  public List<PhongMay> getAllPhongMay() {
    return phongMayRepository.findAll();
  }

  @GetMapping("/getPhongMayById/{id}")
  public PhongMay getPhongMayById(@PathVariable Long id) {
    return phongMayRepository.findById(id).get();
  }

  @PutMapping("/updatePhongMay/{id}")
  public PhongMay updatePhongMay(@RequestBody PhongMay newPhongMay, @PathVariable Long id) {
    return phongMayRepository.findById(id)
    .map(phongMay -> {
      phongMay.setSoPhong(newPhongMay.getSoPhong());
      phongMay.setToaNha(newPhongMay.getToaNha());
      phongMay.setLoaiPhong(newPhongMay.getLoaiPhong());
      return phongMayRepository.save(phongMay);
    }).orElseThrow();
  }

  @DeleteMapping("/deletePhongMay/{id}")
  String deletePhongMay(@PathVariable Long id) {
    phongMayRepository.deleteById(id);
    return "Phong may with id " + id + " has been deleted success.";
  }
}
