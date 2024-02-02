package com.iuh.nhom6.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Transactional
@Data
@NoArgsConstructor
public class LoaiPhong {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "loaiPhong_id")
  private Long id;
  private String tenLoaiPhong;
  private int soLuongMay;
}