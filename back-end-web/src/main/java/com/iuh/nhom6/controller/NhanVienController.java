package com.iuh.nhom6.controller;

import com.iuh.nhom6.model.NhanVien;
import com.iuh.nhom6.repository.NhanVienRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Date;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin
public class NhanVienController {
    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));

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
            @RequestParam("file") MultipartFile image) {
        try {
            NhanVien nhanVien = new NhanVien();
            Path staticPath = Paths.get("back-end-web","static");
            Path imagePath = Paths.get("images");
            if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
                Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
            }
            Path file = CURRENT_FOLDER.resolve(staticPath)
                    .resolve(imagePath).resolve(image.getOriginalFilename());
            try (OutputStream os = Files.newOutputStream(file)) {
                os.write(image.getBytes());
            }
            nhanVien.setImage(imagePath.resolve(image.getOriginalFilename()).toString());
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
            Path staticPath = Paths.get("static");
            Path imagePath = Paths.get("images");
            if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
                Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
            }
            Path file = CURRENT_FOLDER.resolve(staticPath)
                    .resolve(imagePath).resolve(image.getOriginalFilename());
            try (OutputStream os = Files.newOutputStream(file)) {
                os.write(image.getBytes());
            }
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
                            imagePath.resolve(image.getOriginalFilename()).toString());
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
