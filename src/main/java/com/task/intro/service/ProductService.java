package com.task.intro.service;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.task.intro.model.ProductEntity;
import com.task.intro.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public Integer save(MultipartFile file) {
        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {

            CsvToBean<ProductEntity> csvToBean = new CsvToBeanBuilder(reader)
                    .withType(ProductEntity.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();

            List<ProductEntity> products = csvToBean.parse();

            this.repository.saveAll(products);
            return(products.size());

        } catch (Exception ex) {
            System.out.println("Can't parse file!");
            System.out.println(ex.getMessage());
            throw new RuntimeException();
        }
    }
}


