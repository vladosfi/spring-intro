package com.task.intro.controllers;

import com.task.intro.helper.CSVHelper;
import com.task.intro.model.dto.ProductDTO;
import com.task.intro.model.entity.ProductEntity;
import com.task.intro.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/products")
public class ProductsController {

    private final ProductService productService;
    private final CSVHelper csvHelper;

    public ProductsController(ProductService productService, CSVHelper csvHelper) {
        this.csvHelper = csvHelper;
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable("id") Long productId) {
        Optional<ProductDTO> productOpt = productService.getProductById(productId);
        if (productOpt.isEmpty()) {
            return ResponseEntity.
                    notFound().
                    build();
        } else {
            return ResponseEntity.
                    ok(productOpt.get());
        }
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.
                ok(productService.getAllProducts());
    }

    @PostMapping("/upload-csv")
    ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
        Integer recordsCount = 0;

        if (!file.isEmpty()) {
            List<ProductEntity> products = this.csvHelper.csvToProducts(file);
            recordsCount = productService.save(products);

            return ResponseEntity.ok("File Uploaded! " + recordsCount + " records are processed!");
        } else {
            return ResponseEntity.badRequest().body("Invalid file!");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable("id") Long id, @RequestBody ProductDTO productDTO) {

        ProductDTO updatedProductDTO = this.productService.persistProduct(id, productDTO);

        if (updatedProductDTO == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedProductDTO);
    }

    @PostMapping
    public ResponseEntity<ProductDTO> CreateProduct(@RequestBody ProductDTO productDTO) {

        ProductDTO createProductDTO = this.productService.createProduct(productDTO);

        if (createProductDTO == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(createProductDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProductDTO> deleteProductById(@PathVariable("id") Long productId) {
        productService.deleteProductById(productId);

        return ResponseEntity.
                noContent().
                build();
    }
}

