package com.task.intro.controllers;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.task.intro.model.ProductEntity;
import com.task.intro.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URI;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/products")
public class ProductsController {

    private final ProductService productService;

    public ProductsController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/upload-csv")
    ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
        Integer recordsCount = 0;

        if (!file.isEmpty()) {
            recordsCount = productService.save(file);
        }
        else {
            return ResponseEntity.badRequest().body("Invalid file!");
        }

        return ResponseEntity.ok("File Uploaded!" + recordsCount + " records are processed!");

    }
}

