package com.li.demo.entity;

import java.io.Serializable;

/**
 * (Role)实体类
 *
 * @author makejava
 * @since 2020-04-20 15:57:26
 */
public class Role implements Serializable {
    private static final long serialVersionUID = 277366987110841488L;

    private Integer id;

    private String name;

    public static String keyName() {
        return "role:";
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}