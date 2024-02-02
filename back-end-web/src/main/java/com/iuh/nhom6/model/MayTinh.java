package com.iuh.nhom6.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Transactional
@Data
@NoArgsConstructor
public class MayTinh {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "mayTinh_id")
  private Long id;
  private String soMay;
  private Boolean trangThai;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "mayTinh_id",referencedColumnName = "mayTinh_id")
  private List<PhanMem> phanMems;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "mayTinh_id",referencedColumnName = "mayTinh_id")
  private List<ThietBi> thietBis;
}
