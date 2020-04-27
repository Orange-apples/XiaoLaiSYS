package com.li.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@MapperScan({"com.li.demo.dao"})
@EnableCaching
public class XlsysRedisApplication {

    public static void main(String[] args) {
        SpringApplication.run(XlsysRedisApplication.class, args);
    }

}
