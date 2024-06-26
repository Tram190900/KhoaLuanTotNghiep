package com.iuh.nhom6.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Transactional
@Data
@NoArgsConstructor
@Table(uniqueConstraints = { 
  @UniqueConstraint(name = "UniqueTenLoaiPhongAndSoLuongMay", 
  columnNames = { "tenLoaiPhong", "soLuongMay" }) })
public class LoaiPhong implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "loaiPhong_id")
  private Long id;
  private String tenLoaiPhong;
  private int soLuongMay;
}