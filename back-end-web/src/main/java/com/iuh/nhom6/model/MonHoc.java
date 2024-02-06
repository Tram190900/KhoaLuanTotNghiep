package com.iuh.nhom6.model;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Transactional
@Data
@NoArgsConstructor
public class MonHoc implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "monHoc_id")
  private Long id;
  private String tenMonHoc;
  private String khoa;

  @ManyToMany
  @JoinTable(
    name = "subject_software",
    joinColumns = @JoinColumn(name = "monHoc_id"),
    inverseJoinColumns = @JoinColumn(name = "phanMem_id")
  )
  private List<PhanMem> phanMems;
}
