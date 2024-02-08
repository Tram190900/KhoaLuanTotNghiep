package com.iuh.nhom6.model;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Transactional
@Data
@NoArgsConstructor
public class PhanMem implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "phanMem_id")
  private Long id;
  private String tenPhamMem;
  private String phienBan;
  private String theLoai;
  private String phatTrienBoi;

  @JsonIgnore
  @ManyToMany(mappedBy = "phanMems")
  private List<MonHoc> subjects;
}
