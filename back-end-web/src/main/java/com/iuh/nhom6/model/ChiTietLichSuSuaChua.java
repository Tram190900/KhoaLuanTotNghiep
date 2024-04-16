package com.iuh.nhom6.model;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ChiTietLichSuSuaChua {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private Date ngaySuaLoi;
  private String ghiChu;
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "lichSuSuaChua_id", referencedColumnName = "id")
  private LichSuSuaChua lichSuSuaChua;
  
}
