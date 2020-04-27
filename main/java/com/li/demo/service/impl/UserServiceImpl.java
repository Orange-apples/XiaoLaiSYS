package com.li.demo.service.impl;

import com.li.demo.config.BaseConstant;
import com.li.demo.dao.UserDao;
import com.li.demo.entity.User;
import com.li.demo.service.UserService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.Duration;

/**
 * (User)表服务实现类
 *
 * @author makejava
 * @since 2020-04-20 15:57:25
 */
@Service("userService")
public class UserServiceImpl implements UserService {
    @Resource
    private UserDao userDao;
    @Resource
    RedisTemplate redisTemplate;

    @Override
    public User login(User user) {
        ValueOperations valueOperations = redisTemplate.opsForValue();
        String key = User.keyName() + user.getName();
//        查redis
        if (redisTemplate.hasKey(key)) {
            User login = (User) valueOperations.get(key);
            if (login.getPassword().equals(user.getPassword())) return login;
            return null;
        } else {
            //查数据库
            User login = userDao.login(user);
            if (login != null) valueOperations.set(key, login, BaseConstant.ofSeconds());
            return login;
        }
    }
}