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

import com.iuh.nhom6.model.MonHoc;
import com.iuh.nhom6.repository.MonHocRepository;

@RestController
@CrossOrigin
public class MonHocController {
  @Autowired
  private MonHocRepository monHocRepository;

  @PostMapping("/saveMonHoc")
  public MonHoc saveMonHoc(@RequestBody MonHoc monHoc) {
    return monHocRepository.save(monHoc);
  }

  @GetMapping("/getAllMonHoc")
  public List<MonHoc> getAllMonHoc() {
    return monHocRepository.findAll();
  }

  @GetMapping("/getMonHocById/{id}")
  public MonHoc getMonHocById(@PathVariable Long id) {
    return monHocRepository.findById(id).get();
  }

  @PutMapping("/updateMonHoc/{id}")
  public MonHoc updatePhongMay(@RequestBody MonHoc newMonHoc, @PathVariable Long id) {
    return monHocRepository.findById(id)
    .map(monHoc -> {
      monHoc.setTenMonHoc(newMonHoc.getTenMonHoc());
      monHoc.setKhoa(newMonHoc.getKhoa());
      monHoc.setPhanMems(newMonHoc.getPhanMems());
      return monHocRepository.save(monHoc);
    }).orElseThrow();
  }

  @DeleteMapping("/deleteMonHoc/{id}")
  String deleteMonHoc(@PathVariable Long id) {
    monHocRepository.deleteById(id);
    return "Mon hoc with id " + id + " has been deleted success.";
  }
}
