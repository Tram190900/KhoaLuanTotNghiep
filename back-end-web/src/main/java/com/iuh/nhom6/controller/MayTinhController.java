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

import com.iuh.nhom6.model.MayTinh;
import com.iuh.nhom6.repository.MayTinhRepository;

@RestController
@CrossOrigin
public class MayTinhController {
  @Autowired
  private MayTinhRepository mayTinhRepository;

  @PostMapping("/saveMayTinh")
  public MayTinh saveMayTinh(@RequestBody MayTinh mayTinh) {
    return mayTinhRepository.save(mayTinh);
  }

  @GetMapping("/getAllMayTinh")
  public List<MayTinh> getAllMayTinh() {
    return mayTinhRepository.findAll();
  }

  @GetMapping("/getMayTinhById/{id}")
  public MayTinh getMayTinhById(@PathVariable Long id) {
    return mayTinhRepository.findById(id).get();
  }

  @PutMapping("/updateMayTinh/{id}")
  public MayTinh updatePhongMay(@RequestBody MayTinh newMayTinh, @PathVariable Long id) {
    return mayTinhRepository.findById(id)
    .map(mayTinh -> {
      mayTinh.setSoMay(newMayTinh.getSoMay());
      mayTinh.setTrangThai(newMayTinh.getTrangThai());
      mayTinh.setPhanMems(newMayTinh.getPhanMems());
      mayTinh.setThietBis(newMayTinh.getThietBis());
      return mayTinhRepository.save(mayTinh);
    }).orElseThrow();
  }

  @DeleteMapping("/deleteMayTinh/{id}")
  String deleteMayTinh(@PathVariable Long id) {
    mayTinhRepository.deleteById(id);
    return "May tinh with id " + id + " has been deleted success.";
  }
}
