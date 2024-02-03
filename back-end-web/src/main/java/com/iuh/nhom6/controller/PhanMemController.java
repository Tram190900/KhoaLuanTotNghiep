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

import com.iuh.nhom6.model.PhanMem;
import com.iuh.nhom6.repository.PhanMemRepository;

@RestController
@CrossOrigin
public class PhanMemController {
  @Autowired
  private PhanMemRepository phanMemRepository;

  @PostMapping("/savePhanMem")
  public PhanMem savePhanMem(@RequestBody PhanMem phanMem) {
    return phanMemRepository.save(phanMem);
  }

  @GetMapping("/getAllPhanMem")
  public List<PhanMem> getAllPhanMem() {
    return phanMemRepository.findAll();
  }

  @GetMapping("/getPhanMemById/{id}")
  public PhanMem getPhanMemById(@PathVariable Long id) {
    return phanMemRepository.findById(id).get();
  }

  @PutMapping("/updatePhanMem/{id}")
  public PhanMem updatePhanMem(@RequestBody PhanMem newPhanMem, @PathVariable Long id) {
    return phanMemRepository.findById(id)
    .map(phanMem -> {
      phanMem.setTenPhamMem(newPhanMem.getTenPhamMem());
      phanMem.setPhienBan(newPhanMem.getPhienBan());
      phanMem.setTheLoai(newPhanMem.getTheLoai());
      phanMem.setPhatTrienBoi(newPhanMem.getPhatTrienBoi());
//      phanMem.setNgayCaiDat(newPhanMem.getNgayCaiDat());
      return phanMemRepository.save(phanMem);
    }).orElseThrow();
  }

  @DeleteMapping("/deletePhanMem/{id}")
  String deletePhanMem(@PathVariable Long id) {
    phanMemRepository.deleteById(id);
    return "Phan mem with id " + id + " has been deleted success.";
  }
}
