package com.task.intro.service;

import com.task.intro.model.dto.ProductDTO;
import com.task.intro.model.entity.ProductEntity;
import com.task.intro.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public Integer save(List<ProductEntity> products) {
        this.repository.saveAll(products);
        return (products.size());
    }


    public List<ProductDTO> getAllProducts() {
        return repository.
                findAll().
                stream().
                map(this::map).
                collect(Collectors.toList());
    }

    private ProductDTO map(ProductEntity productEntity) {
        return new
                ProductDTO().
                setId(productEntity.getId()).
                setName(productEntity.getName()).
                setCode(productEntity.getCode());
    }
}



