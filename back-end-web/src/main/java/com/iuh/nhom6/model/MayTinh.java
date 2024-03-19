package com.iuh.nhom6.model;

import java.io.Serializable;
import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
  private int trangThai;

  @ManyToOne(cascade = CascadeType.ALL)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name = "phongMay_id")
  private PhongMay phongMay;

  @JsonIgnore
  @OneToMany(mappedBy = "mayTinh", cascade = CascadeType.ALL)
  private List<ChiTietCaiDat> chiTietCaiDats;

  @JsonIgnore
  @OneToMany(mappedBy = "mayTinh", cascade = CascadeType.ALL)
  private List<ChiTietLapDat> chiTietLapDats;

  @JsonIgnore
  @OneToMany(mappedBy = "mayTinh", cascade = CascadeType.ALL)
  private List<LichSuSuaChua> lichSuSuaChuas;

//  @OneToMany(cascade = CascadeType.ALL)
//  @JoinColumn(name = "mayTinh_id",referencedColumnName = "mayTinh_id")
//  private List<PhanMem> phanMems;
//
//  @OneToMany(cascade = CascadeType.ALL)
//  @JoinColumn(name = "mayTinh_id",referencedColumnName = "mayTinh_id")
//  private List<ThietBi> thietBis;

/*   @OneToMany(cascade = CascadeType.ALL, mappedBy = "mayTinh")
  private List<LichSuSuaChua> lichSuSuaChuas; */
}
