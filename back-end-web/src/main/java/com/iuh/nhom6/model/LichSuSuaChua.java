package com.iuh.nhom6.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Setter
@Getter
public class LichSuSuaChua {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String loiGapPhai;
  private Date ngayGapLoi;
  private int mucDoLoi;
  private Boolean trangThai;
/*   @OneToOne(mappedBy = "lichSuSuaChua")
  private ChiTietLichSuSuaChua chiTietLichSuSuaChua; */
  @ManyToOne
  @JoinColumn(name = "mayTinh_id", referencedColumnName = "mayTinh_id")
  private MayTinh mayTinh;

  @JsonIgnore
  @OneToOne(mappedBy = "lichSuSuaChua" ,cascade = CascadeType.ALL)
  private ChiTietLichSuSuaChua chiTietLichSuSuaChua;
}
