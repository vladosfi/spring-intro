package com.task.intro.helper;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.task.intro.model.entity.ProductEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

@Service
public class CSVHelper {

    public static List<ProductEntity> csvToProducts(MultipartFile file) {
        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {

            CsvToBean<ProductEntity> csvToBean = new CsvToBeanBuilder(reader)
                    .withType(ProductEntity.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();

            List<ProductEntity> products = csvToBean.parse();

            return(products);

        } catch (Exception ex) {
            throw new RuntimeException("fail to parse CSV file: " + ex.getMessage());
        }
    }
}
