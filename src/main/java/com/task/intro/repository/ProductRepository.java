package com.task.intro.repository;

import com.task.intro.model.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository   extends JpaRepository<ProductEntity, Integer>  {
}
