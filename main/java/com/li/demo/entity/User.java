package com.li.demo.entity;

import java.io.Serializable;

/**
 * (User)实体类
 *
 * @author makejava
 * @since 2020-04-20 15:57:23
 */
public class User implements Serializable {
    private static final long serialVersionUID = -45841731095591567L;

    private Integer id;

    private String name;

    private String password;

    public static String keyName() {
        return "user:";
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}