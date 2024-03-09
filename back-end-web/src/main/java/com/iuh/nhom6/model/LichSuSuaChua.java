package com.iuh.nhom6.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
  private Boolean mucDoLoi;
  private Boolean trangThai;
/*   @OneToOne(mappedBy = "lichSuSuaChua")
  private ChiTietLichSuSuaChua chiTietLichSuSuaChua; */
  @ManyToOne
  @JoinColumn(name = "mayTinh_id", referencedColumnName = "mayTinh_id")
  private MayTinh mayTinh;
}
