package com.iuh.nhom6.model;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

  @ManyToOne
  @JoinColumn(name = "nhanVien_id")
  private NhanVien nhanVien;

  @JsonIgnore
  @OneToMany(mappedBy = "phongMay",cascade = CascadeType.ALL)
  private List<MayTinh> mayTinhs;
}
