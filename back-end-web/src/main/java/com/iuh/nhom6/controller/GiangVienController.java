package com.iuh.nhom6.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.iuh.nhom6.model.GiangVien;
import com.iuh.nhom6.repository.GiangVienRepository;
import com.iuh.nhom6.util.AWSCloudUtil;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin
@RequestMapping("/giangVien")
public class GiangVienController {
    @Value("${aws.accesskey}")
    private String AWS_ACCESS_KEY;

    @Value("${aws.s3.bucket}")
    private String AWS_BUCKET;

    @Value("${aws.secretkey}")
    private String AWS_SECRET_KEY;
    @Autowired
    private GiangVienRepository giangVienRepository;

    @GetMapping("/{id}")
    public GiangVien getGiangVienById(@PathVariable Long id) {
        try {
            return giangVienRepository.findById(id).get();
        } catch (Exception e) {
            e.printStackTrace();
            return null;// TODO: handle exception
        }
    }

    @GetMapping("/getAllGiangVien")
    public List<GiangVien> getAllGiangVien() {
        return giangVienRepository.findAll();
    }

    @GetMapping("/getGiangVienByTen/{ten}")
    public GiangVien getGiangVienByTen(@PathVariable String ten) {
        return giangVienRepository.findGiangVienByTenGiangVienContainingIgnoreCase(ten);
    }

    @PostMapping("/saveGiangVien")
    public GiangVien saveGiangVien(@RequestParam("tenGiangVien") String hoTenNhanVien,
            @RequestParam("email") String email,
            @RequestParam("sdt") String sdt,
            @RequestParam("gioiTinh") Boolean gioiTinh,
            @RequestParam("diaChi") String diaChi,
            @RequestParam("trangThai") Boolean trangThai,
            @RequestParam(value = "file", required = false) MultipartFile image) {
        try {
            GiangVien giangVien = new GiangVien();
            if (image != null && !image.isEmpty()) {
                AWSCloudUtil util = new AWSCloudUtil();
                util.uploadFileToS3(image.getOriginalFilename(), image.getBytes(), AWS_ACCESS_KEY, AWS_SECRET_KEY,
                        AWS_BUCKET);
                giangVien.setImage("https://tramcmn.s3.ap-southeast-1.amazonaws.com/" + image.getOriginalFilename());
            }else{
                giangVien.setImage(null);
            }
            giangVien.setTenGiangVien(hoTenNhanVien);
            giangVien.setEmail(email);
            giangVien.setDiaChi(diaChi);
            giangVien.setGioiTinh(gioiTinh);
            giangVien.setSdt(sdt);
            giangVien.setTrangThai(trangThai);
            return giangVienRepository.save(giangVien);
        } catch (Exception e) {
            e.printStackTrace();
            return null;// TODO: handle exception
        }
    }

    @PutMapping("/updateGiangVien/{id}")
    public GiangVien updatGiangVien(@PathVariable Long id, @RequestParam("tenGiangVien") String hoTenNhanVien,
            @RequestParam("email") String email,
            @RequestParam("sdt") String sdt,
            @RequestParam("gioiTinh") Boolean gioiTinh,
            @RequestParam("diaChi") String diaChi,
            @RequestParam("trangThai") Boolean trangThai,
            @RequestParam("image") String img,
            @RequestParam(value = "file", required = false) MultipartFile image) {
        // TODO: process PUT request

        try {
            GiangVien newGiangVien = new GiangVien(id, hoTenNhanVien, email, sdt, gioiTinh, diaChi, trangThai, img);
            return giangVienRepository.findById(id).map(
                    giangVien -> {
                        giangVien.setTenGiangVien(newGiangVien.getTenGiangVien());
                        giangVien.setSdt(newGiangVien.getSdt());
                        giangVien.setEmail(newGiangVien.getEmail());
                        giangVien.setDiaChi(newGiangVien.getDiaChi());
                        giangVien.setGioiTinh(newGiangVien.getGioiTinh());
                        giangVien.setTrangThai(newGiangVien.getTrangThai());
                        try {
                            if (image != null && !image.isEmpty()) {
                                AWSCloudUtil util = new AWSCloudUtil();
                                util.uploadFileToS3(image.getOriginalFilename(), image.getBytes(), AWS_ACCESS_KEY,
                                        AWS_SECRET_KEY,
                                        AWS_BUCKET);
                                giangVien.setImage("https://tramcmn.s3.ap-southeast-1.amazonaws.com/"
                                        + image.getOriginalFilename());

                            } else {
                                giangVien.setImage(newGiangVien.getImage());
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                            giangVien.setImage(newGiangVien.getImage());
                        }
                        return giangVienRepository.save(giangVien);
                    }).orElseThrow();
        } catch (Exception e) {
            e.printStackTrace();
            return null;// TODO: handle exception
        }
    }

}
