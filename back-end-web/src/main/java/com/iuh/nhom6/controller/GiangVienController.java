package com.iuh.nhom6.controller;

import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.iuh.nhom6.model.GiangVien;
import com.iuh.nhom6.model.NhanVien;
import com.iuh.nhom6.repository.GiangVienRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@CrossOrigin
@RequestMapping("/giangVien")
public class GiangVienController {
    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));
    @Autowired
    private GiangVienRepository giangVienRepository;

    @GetMapping("{id}")
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
            @RequestParam("file") MultipartFile image) {
        try {
            GiangVien giangVien = new GiangVien();
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
            giangVien.setImage(imagePath.resolve(image.getOriginalFilename()).toString());
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
            @RequestParam("file") MultipartFile image) {
        // TODO: process PUT request

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
            GiangVien newGiangVien = new GiangVien(id, hoTenNhanVien, email, sdt, gioiTinh, diaChi, trangThai, diaChi);
            return giangVienRepository.findById(id).map(
                    giangVien -> {
                        giangVien.setTenGiangVien(newGiangVien.getTenGiangVien());
                        giangVien.setSdt(newGiangVien.getSdt());
                        giangVien.setEmail(newGiangVien.getEmail());
                        giangVien.setDiaChi(newGiangVien.getDiaChi());
                        giangVien.setGioiTinh(newGiangVien.getGioiTinh());
                        giangVien.setTrangThai(newGiangVien.getTrangThai());
                        giangVien.setImage(
                                imagePath.resolve(image.getOriginalFilename()).toString());
                        return giangVienRepository.save(giangVien);
                    }).orElseThrow();
        } catch (Exception e) {
            e.printStackTrace();
            return null;// TODO: handle exception
        }
    }

}
