package com.task.intro.model.entity;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "products")
public class ProductEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 50)
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    private String name;

    @Column(name = "code", length = 10, unique=true)
    @Size(min = 10, max = 10, message = "Code must be 10 characters long")
    private String code;

    public Long  getId() {
        return id;
    }

    public ProductEntity setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public ProductEntity setName(String name) {
        this.name = name;
        return this;
    }

    public String getCode() {
        return code;
    }

    public ProductEntity() {

    }

    public ProductEntity setCode(String code) {
        this.code = code;
        return this;
    }

    public ProductEntity(Long  id, String name, String code) {
        this.id = id;
        this.name = name;
        this.code = code;
    }


    @Override
    public String toString() {
        return "ProductEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", code='" + code + '\'' +
                '}';
    }
}