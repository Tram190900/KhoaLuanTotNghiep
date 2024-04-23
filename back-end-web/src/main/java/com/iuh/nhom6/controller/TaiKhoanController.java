package com.iuh.nhom6.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.iuh.nhom6.model.GiangVien;
import com.iuh.nhom6.model.NhanVien;
import com.iuh.nhom6.model.TaiKhoan;
import com.iuh.nhom6.repository.GiangVienRepository;
import com.iuh.nhom6.repository.NhanVienRepository;
import com.iuh.nhom6.repository.TaiKhoanRepository;

@RestController
@CrossOrigin
@RequestMapping("/taikhoan")
public class TaiKhoanController {
    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private NhanVienRepository nhanVienRepository;

    @Autowired
    private GiangVienRepository giangVienRepository;

    @GetMapping("/{tenTaiKhoan}")
    public TaiKhoan getTaiKhoanByTen(@PathVariable String tenTaiKhoan) {
        TaiKhoan taiKhoan = taiKhoanRepository.findById(tenTaiKhoan).get();
        taiKhoan.setMatKhau(null); // Loại bỏ trường matKahu
        return taiKhoan;
    }

    @PostMapping("/dangKy")
    public TaiKhoan postMethodName(@RequestBody TaiKhoan taiKhoan) {
        return taiKhoanRepository.save(taiKhoan);
    }

    @PutMapping("/doiMatKhau/{id}")
    public ResponseEntity<String> putMatKhau(@PathVariable String id, @RequestParam("matKhauCu") String mkCu,
            @RequestParam("matKhauMoi") String mkMoi) {
        return taiKhoanRepository.findById(id)
                .map(taiKhoan -> {
                    if (taiKhoan.getMatKhau().equals(mkCu)) {
                        taiKhoan.setMatKhau(mkMoi);
                        taiKhoanRepository.save(taiKhoan);
                        return ResponseEntity.ok("Đổi mật khẩu thành công");
                    } else {
                        return ResponseEntity.badRequest().body("Mật khẩu cũ sai");
                    }
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
