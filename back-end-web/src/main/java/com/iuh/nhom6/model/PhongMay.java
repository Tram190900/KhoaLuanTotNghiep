package com.iuh.nhom6.model;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Transactional
@Data
@NoArgsConstructor
public class PhongMay implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "phongMay_id")
  private Long id;

  private String soPhong;

  @ManyToOne
  @JoinColumn(name = "toaNha_id")
  private ToaNha toaNha;

  @ManyToOne
  @JoinColumn(name = "loaiPhong_id")
  private LoaiPhong loaiPhong;
}
