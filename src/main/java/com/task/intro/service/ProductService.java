package com.task.intro.service;

import com.task.intro.model.dto.ProductDTO;
import com.task.intro.model.entity.ProductEntity;
import com.task.intro.repository.ProductRepository;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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

    public Optional<ProductDTO> getProductById(Long productId) {
        return repository.
                findById(productId).
                map(this::map);
    }

    public List<ProductDTO> getAllProducts() {
        return repository.
                findAll(Sort.by(Sort.Direction.DESC, "id")).
                stream().
                map(this::map).
                collect(Collectors.toList());
    }

    public void deleteProductById(Long productId) {
        try {
            this.repository.deleteById(productId);
        } catch (EmptyResultDataAccessException e) {
            e.printStackTrace();
        }
    }

    public ProductDTO createProduct(ProductDTO productDTO) {

        var newProductEntity = new ProductEntity().
                setName(productDTO.getName()).
                setCode(productDTO.getCode());

       this.repository.saveAndFlush(newProductEntity);
        productDTO.setId(newProductEntity.getId());

        return productDTO;
    }

    public ProductDTO persistProduct(Long id, ProductDTO productDTO) {

        Optional<ProductEntity> bookOpt = this.repository.findById(id);

        if(bookOpt.isEmpty()) {
            return null;
        }

        ProductEntity productEntity = bookOpt.get();

        updateProductEntity(productEntity, productDTO);

        this.repository.save(productEntity);

        return this.map(productEntity);
    }

    private void updateProductEntity(ProductEntity productEntity, ProductDTO productDTO) {
        String name = productDTO.getName();
        if(name != null) {
            productEntity.setName(name);
        }

        String code = productDTO.getCode();
        if(code != null) {
            productEntity.setCode(code);
        }
    }

    private ProductDTO map(ProductEntity productEntity) {
        return new
                ProductDTO().
                setId(productEntity.getId()).
                setName(productEntity.getName()).
                setCode(productEntity.getCode());
    }
}



