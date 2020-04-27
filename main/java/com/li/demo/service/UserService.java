package com.li.demo.service;

import com.li.demo.entity.User;

/**
 * (User)表服务接口
 *
 * @author makejava
 * @since 2020-04-20 15:57:25
 */
public interface UserService {

    /**
     * @param user 用户输入的用户名密码
     * @return 数据库查询的结果
     */
    User login(User user);
}