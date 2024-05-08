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

@RestController
@CrossOrigin
public class NhanVienController {
    @Value("${aws.accesskey}")
    private String AWS_ACCESS_KEY;

    @Value("${aws.s3.bucket}")
    private String AWS_BUCKET;

    @Value("${aws.secretkey}")
    private String AWS_SECRET_KEY;

    @Autowired
    private NhanVienRepository nhanVienRepository;

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
            @RequestParam(value = "file", required = false) MultipartFile image) {
        try {
            NhanVien nhanVien = new NhanVien();
            if (image != null && !image.isEmpty()) {
                AWSCloudUtil util = new AWSCloudUtil();
                util.uploadFileToS3(image.getOriginalFilename(), image.getBytes(), AWS_ACCESS_KEY, AWS_SECRET_KEY,
                        AWS_BUCKET);
                nhanVien.setImage("https://tramcmn.s3.ap-southeast-1.amazonaws.com/" + image.getOriginalFilename());

            } else {
                nhanVien.setImage(null);
            }
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
            @RequestParam("image") String img,
            @RequestParam(value = "file", required = false) MultipartFile image, @PathVariable Long id) {
        try {
            NhanVien nhanVien = new NhanVien(id, hoTenNhanVien, email, sdt, gioiTinh, diaChi, trangThai, img);
            return nhanVienRepository.findById(id).map(
                    newNhanVien -> {
                        newNhanVien.setHoTenNhanVien(nhanVien.getHoTenNhanVien());
                        newNhanVien.setSdt(nhanVien.getSdt());
                        newNhanVien.setEmail(nhanVien.getEmail());
                        newNhanVien.setDiaChi(nhanVien.getDiaChi());
                        newNhanVien.setGioiTinh(nhanVien.getGioiTinh());
                        newNhanVien.setTrangThai(nhanVien.getTrangThai());
                        try {

                            if (image != null && !image.isEmpty()) {
                                AWSCloudUtil util = new AWSCloudUtil();
                                util.uploadFileToS3(image.getOriginalFilename(), image.getBytes(), AWS_ACCESS_KEY,
                                        AWS_SECRET_KEY,
                                        AWS_BUCKET);
                                newNhanVien.setImage("https://tramcmn.s3.ap-southeast-1.amazonaws.com/"
                                        + image.getOriginalFilename());

                            } else {
                                newNhanVien.setImage(nhanVien.getImage());
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                            newNhanVien.setImage(nhanVien.getImage());
                            // TODO: handle exception
                        }
                        return nhanVienRepository.save(newNhanVien);
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
