package com.iuh.nhom6.dto;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChiTietLichSuChuaSuaDTO {
    private Long lichSuSuaChuaId;
    private String loiGapPhai;
    private int mucDoLoi;
    private LocalDateTime ngayGapLoi;
    private boolean trangThai;
    private Long mayTinhId;
    private Long chiTietLichSuSuaLoiId;
    private String ghiChu;
    private LocalDateTime ngaySuaLoi;
    private Long nhanVienId;
    private String soMay;

    public ChiTietLichSuChuaSuaDTO(Object[] row) {
        this.lichSuSuaChuaId = (Long) row[0];
        this.loiGapPhai = (String) row[1];
        this.mucDoLoi = (Integer) row[2];
        this.ngayGapLoi = ((Timestamp) row[3]).toLocalDateTime();
        this.trangThai = (boolean) row[4];
        this.mayTinhId = (Long) row[5];
        this.chiTietLichSuSuaLoiId = (Long) row[6];
        this.ghiChu = row[7] != null ? (String) row[7] : null;
        this.ngaySuaLoi = row[8] != null ? ((Timestamp) row[8]).toLocalDateTime() : null;
        this.nhanVienId = row[10] != null ? (Long) row[10] : null;
        this.soMay = row[11] != null ? row[11].toString() : null;
    };
}
