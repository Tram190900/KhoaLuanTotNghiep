package com.iuh.nhom6.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iuh.nhom6.model.ToaNha;
import com.iuh.nhom6.repository.ToaNhaRepository;

@CrossOrigin
@RestController
@RequestMapping("/toanha")
public class ToaNhaController {
  @Autowired
  private ToaNhaRepository toaNhaRepository;

  @GetMapping
  public List<ToaNha> xemDanhSachToaNha() {
    return toaNhaRepository.findAll();
  }
}
