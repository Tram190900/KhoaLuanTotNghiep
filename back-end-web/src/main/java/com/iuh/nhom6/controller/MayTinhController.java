package com.iuh.nhom6.controller;

import java.util.List;

import com.iuh.nhom6.model.PhongMay;
import com.iuh.nhom6.model.ToaNha;
import com.iuh.nhom6.repository.PhongMayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
  @Autowired
  private PhongMayRepository phongMayRepository;

  @PostMapping("/saveMayTinh")
  public ResponseEntity<?> saveMayTinh(@RequestBody MayTinh mayTinh) {
    PhongMay phongMay = phongMayRepository.findPhongMayBySoPhong(mayTinh.getPhongMay().getSoPhong());
    /* if(phongMay==null){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Phòng này không tồn tại !");
    }
    MayTinh checkExitSoMay = mayTinhRepository.findMayTinhBySoMayContainingIgnoreCase(mayTinh.getSoMay());
    if(checkExitSoMay!=null){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Số máy này đã tồn tại");
    } */

    mayTinh.setPhongMay(phongMay);
    MayTinh savedMayTinh = mayTinhRepository.save(mayTinh);

    return ResponseEntity.ok(savedMayTinh);
  }

  @GetMapping("/getAllMayTinh")
  public List<MayTinh> getAllMayTinh() {
    return mayTinhRepository.findAll();
  }

  @GetMapping("/getMayTinhById/{id}")
  public MayTinh getMayTinhById(@PathVariable Long id) {
    return mayTinhRepository.findById(id).get();
  }

  @GetMapping("/getMayTinhBySoMay/{soMay}")
  public MayTinh getMayTinhBySoMay(@PathVariable String soMay){
    return mayTinhRepository.findMayTinhBySoMayContainingIgnoreCase((soMay));
  }

  @GetMapping("/getMayTinhByPhong/{soPhong}")
  public List<MayTinh> getMayTinhByPhong(@PathVariable String soPhong){
    PhongMay phongMay = phongMayRepository.findPhongMayBySoPhong(soPhong);
    return mayTinhRepository.findMayTinhsByPhongMay(phongMay);
  }

  @GetMapping("/getMayTinhByIdPhong/{id}")
  public List<MayTinh> getMayTinhByPhong(@PathVariable Long id){
    PhongMay phongMay = phongMayRepository.findById(id).get();
    return mayTinhRepository.findMayTinhsByPhongMay(phongMay);
  }

  @PutMapping("/updateMayTinh/{id}")
  public MayTinh updatePhongMay(@RequestBody MayTinh newMayTinh, @PathVariable Long id) {
    return mayTinhRepository.findById(id)
    .map(mayTinh -> {
      mayTinh.setSoMay(newMayTinh.getSoMay());
      mayTinh.setTrangThai(newMayTinh.getTrangThai());
      return mayTinhRepository.save(mayTinh);
    }).orElseThrow();
  }

  @DeleteMapping("/deleteMayTinh/{id}")
  String deleteMayTinh(@PathVariable Long id) { 
    mayTinhRepository.deleteById(id);
    return "May tinh with id " + id + " has been deleted success.";
  } 

  @GetMapping("/maytinh/{id}/phantrang/{offset}/{pageSize}")
  public Page<MayTinh> xemDanhSachMayTinhPhanTrang(@PathVariable Long id,@PathVariable int offset, @PathVariable int pageSize) {
    PhongMay phongMay = phongMayRepository.findById(id).get();
    return mayTinhRepository.findMayTinhByPhongMay(phongMay, PageRequest.of(offset, pageSize));
  }

  @GetMapping("/maytinh/{trangthai}/phantrangtrangthai/{offset}/{pageSize}")
  public Page<MayTinh> xemDanhSachTrangThaiMayTinhPhanTrang(@PathVariable int trangthai,@PathVariable int offset, @PathVariable int pageSize) {
    return mayTinhRepository.findMayTinhByTrangThai(trangthai, PageRequest.of(offset, pageSize));
  }
}
