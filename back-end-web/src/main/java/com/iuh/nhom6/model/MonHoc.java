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
public class MonHoc {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "monHoc_id")
  private Long id;
  private String tenMonHoc;
  private String khoa;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "monHoc_id",referencedColumnName = "monHoc_id")
  private List<PhanMem> phanMems;
}
