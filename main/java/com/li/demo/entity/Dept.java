package com.li.demo.entity;

import java.io.Serializable;

/**
 * (Dept)实体类
 *
 * @author makejava
 * @since 2020-04-20 15:57:26
 */
public class Dept implements Serializable {
    private static final long serialVersionUID = 587348165204353379L;

    private Integer id;

    private String name;

    private String dNo;

    private String content;

    public static String keyName() {
        return "dept:";
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

    public String getdNo() {
        return dNo;
    }

    public void setdNo(String dNo) {
        this.dNo = dNo;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}