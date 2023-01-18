package com.task.intro.service;

import com.task.intro.model.entity.ProductEntity;
import com.task.intro.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;


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
}



