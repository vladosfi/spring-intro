package com.task.intro.model.entity;

import javax.persistence.*;

@Entity
@Table(name = "products")
public class ProductEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "code", unique=true)
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

    public ProductEntity setCode(String code) {
        this.code = code;
        return this;
    }


    public ProductEntity() {

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