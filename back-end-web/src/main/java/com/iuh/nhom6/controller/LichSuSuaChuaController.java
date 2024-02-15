package com.iuh.nhom6.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iuh.nhom6.model.LichSuSuaChua;
import com.iuh.nhom6.repository.LichSuSuaChuaRepository;

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
}
