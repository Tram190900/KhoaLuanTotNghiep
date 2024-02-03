package com.iuh.nhom6.model;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Transactional
@Data
@NoArgsConstructor
public class MayTinh implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "mayTinh_id")
  private Long id;
  private String soMay;
  private Boolean trangThai;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "phongMay_id")
  private PhongMay phongMay;

//  @OneToMany(cascade = CascadeType.ALL)
//  @JoinColumn(name = "mayTinh_id",referencedColumnName = "mayTinh_id")
//  private List<PhanMem> phanMems;
//
//  @OneToMany(cascade = CascadeType.ALL)
//  @JoinColumn(name = "mayTinh_id",referencedColumnName = "mayTinh_id")
//  private List<ThietBi> thietBis;
}
