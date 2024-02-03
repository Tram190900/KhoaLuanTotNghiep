package com.iuh.nhom6.model;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Transactional
@Data
@NoArgsConstructor
public class ThietBi implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "thietBi_id")
  private Long id;
  private String tenThietBi;
  private int soLuong;
}
