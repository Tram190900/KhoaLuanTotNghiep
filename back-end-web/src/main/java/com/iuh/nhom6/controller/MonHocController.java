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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iuh.nhom6.model.MonHoc;
import com.iuh.nhom6.repository.MonHocRepository;

@RestController
@CrossOrigin
@RequestMapping("/monHocs")
public class MonHocController {
  @Autowired
  private MonHocRepository monHocRepository;

  @PostMapping
  public MonHoc saveMonHoc(@RequestBody MonHoc monHoc) {
    return monHocRepository.save(monHoc);
  }

  @GetMapping
  public List<MonHoc> getMonHocs() {
    return monHocRepository.findAll();
  }

  @PutMapping("/{id}")
  public MonHoc updateMonHoc(@RequestBody MonHoc newMonHoc, @PathVariable Long id) {
    return monHocRepository.findById(id)
      .map(monHoc -> {
        monHoc.setKhoa(newMonHoc.getKhoa());
        monHoc.setTenMonHoc(newMonHoc.getTenMonHoc());
        monHoc.setPhanMems(newMonHoc.getPhanMems());
        return monHocRepository.save(monHoc);
      }).orElseThrow();
  }

  @DeleteMapping("/{id}")
  public String deleteMonHoc(@PathVariable Long id) {
    monHocRepository.deleteById(id);
    return "Môn học có id " + id + " đã được xóa";
  }
}
