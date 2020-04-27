package com.li.demo.config;

import java.time.Duration;
import java.util.Random;

public class BaseConstant {
    public static final Integer PAGESIZE = 3;
    public static Duration ofSeconds(){

      return   Duration.ofSeconds(new Random().nextInt(500-200)+200);
    }
}
