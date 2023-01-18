package com.task.intro.model.dto;

public class ProductDTO {
    private Long id;
    private String name;
    private String code;

    public Long getId() {
        return id;
    }

    public ProductDTO setId(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public ProductDTO setName(String name) {
        this.name = name;
        return this;
    }

    public String getCode() {
        return code;
    }

    public ProductDTO setCode(String code) {
        this.code = code;
        return this;
    }
}
