package com.iuh.nhom6.controller;

import com.iuh.nhom6.model.NhanVien;
import com.iuh.nhom6.repository.NhanVienRepository;
import com.iuh.nhom6.util.AWSCloudUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin
public class NhanVienController {
    @Autowired
    private NhanVienRepository nhanVienRepository;

    @Value("${aws.accesskey}")
    private String AWS_ACCESS_KEY;

    @Value("${aws.s3.bucket}")
    private String AWS_BUCKET;

    @Value("${aws.secretkey}")
    private String AWS_SECRET_KEY;

    @GetMapping("/getAllNhanVien")
    public List<NhanVien> getAllNhanVien() {
        return nhanVienRepository.findAll();
    }

    @GetMapping("/getNhanVienByTen/{hoTen}")
    public NhanVien getNhanVienByTen(@PathVariable String hoTen) {
        return nhanVienRepository.findNhanVienByHoTenNhanVienContainingIgnoreCase(hoTen);
    }

    @PostMapping("/saveNhanVien")
    public NhanVien saveNhanVien(@RequestParam("hoTenNhanVien") String hoTenNhanVien,
            @RequestParam("email") String email,
            @RequestParam("sdt") String sdt,
            @RequestParam("gioiTinh") Boolean gioiTinh,
            @RequestParam("diaChi") String diaChi,
            @RequestParam("trangThai") Boolean trangThai,
            @RequestParam("file") MultipartFile image) {
        try {
            AWSCloudUtil util = new AWSCloudUtil();
            NhanVien nhanVien = new NhanVien();
            util.uploadFileToS3(image.getOriginalFilename(), image.getBytes(), AWS_ACCESS_KEY, AWS_SECRET_KEY,
                    AWS_BUCKET);
            nhanVien.setImage("https://tramcmn.s3.ap-southeast-1.amazonaws.com/" + image.getOriginalFilename());
            nhanVien.setHoTenNhanVien(hoTenNhanVien);
            nhanVien.setEmail(email);
            nhanVien.setDiaChi(diaChi);
            nhanVien.setGioiTinh(gioiTinh);
            nhanVien.setSdt(sdt);
            nhanVien.setTrangThai(trangThai);
            return nhanVienRepository.save(nhanVien);
        } catch (Exception e) {
            e.printStackTrace();// TODO: handle exception
            return null;
        }
    }

    @PutMapping("/updateNhanVien/{id}")
    public NhanVien updateNhanVien(@RequestParam("hoTenNhanVien") String hoTenNhanVien,
            @RequestParam("email") String email,
            @RequestParam("sdt") String sdt,
            @RequestParam("gioiTinh") Boolean gioiTinh,
            @RequestParam("diaChi") String diaChi,
            @RequestParam("trangThai") Boolean trangThai,
            @RequestParam("file") MultipartFile image, @PathVariable Long id) {
        try {
            AWSCloudUtil util = new AWSCloudUtil();
            util.uploadFileToS3(image.getOriginalFilename(), image.getBytes(), AWS_ACCESS_KEY, AWS_SECRET_KEY,
                    AWS_BUCKET);
            NhanVien newNhanVien = new NhanVien(id, hoTenNhanVien, email, sdt, gioiTinh, diaChi, trangThai, diaChi);
            return nhanVienRepository.findById(id).map(
                    nhanVien -> {
                        nhanVien.setHoTenNhanVien(newNhanVien.getHoTenNhanVien());
                        nhanVien.setSdt(newNhanVien.getSdt());
                        nhanVien.setEmail(newNhanVien.getEmail());
                        nhanVien.setDiaChi(newNhanVien.getDiaChi());
                        nhanVien.setGioiTinh(newNhanVien.getGioiTinh());
                        nhanVien.setTrangThai(newNhanVien.getTrangThai());
                        nhanVien.setImage(
                                "https://tramcmn.s3.ap-southeast-1.amazonaws.com/" + image.getOriginalFilename());
                        return nhanVienRepository.save(nhanVien);
                    }).orElseThrow();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    @GetMapping("/getNhanVienById/{id}")
    public NhanVien getMethodName(@PathVariable Long id) {
        return nhanVienRepository.findById(id).get();
    }

    @PostMapping("/getNhanVienTheoCaTruc")
    public NhanVien getNhanVienTheoCaTruc(@RequestParam("ngayTruc") Date ngayTruc,
            @RequestParam("phongTruc") Long phongTruc) {
                try {
                    return nhanVienRepository.findNhanVienByNgayTrucAndPhongMay(ngayTruc, phongTruc);
                } catch (Exception e) {
                    e.printStackTrace();
                    return null;
                }
    }

}
