package com.li.demo.service.impl;

import com.li.demo.config.BaseConstant;
import com.li.demo.dao.RoleDao;
import com.li.demo.entity.Role;
import com.li.demo.service.RoleService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.Duration;
import java.util.List;

/**
 * (Role)表服务实现类
 *
 * @author makejava
 * @since 2020-04-20 15:57:26
 */
@Service("roleService")
public class RoleServiceImpl implements RoleService {
    @Resource
    private RoleDao roleDao;
    @Resource
    RedisTemplate redisTemplate;

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    @Override
    public Role queryById(Integer id) {
        if (redisTemplate.hasKey(Role.keyName() + id)) {
            return (Role) redisTemplate.opsForValue().get(Role.keyName() + id);
        } else {
            Role role = this.roleDao.queryById(id);
            if (role != null) redisTemplate.opsForValue().set(Role.keyName() + id, role, BaseConstant.ofSeconds());
            return role;
        }

    }

    @Override
    public List<Role> queryAll(Role role) {
//        //初始化返回数组
//        List<Role> roles = new ArrayList<>();
//        //获取数据库中所有数据的id
//        List<Integer> ids = new ArrayList();
//            ids = Arrays.asList(roleDao.queryIds(role));
//        for (int i = 0; i < ids.size(); i++) {
//            //遍历ids从缓存或者数据库中查找出对应id的数据；并放入roles中
//            Role role1 = this.queryById(ids.get(i));
//
//            //将数据添加到数组中
//            roles.add(role1);
//        }
//        return roles;
        return roleDao.queryAll(role);
    }

    /**
     * 新增数据
     *
     * @param role 实例对象
     * @return 实例对象
     */
    @Override
    public Role insert(Role role) {
        this.roleDao.insert(role);
        return role;
    }

    /**
     * 修改数据
     *
     * @param role 实例对象
     * @return 实例对象
     */
    @Override
    public Role update(Role role)  {
        this.roleDao.update(role);
        redisTemplate.opsForValue().set(Role.keyName() + role.getId(), role);
        return role;
    }

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    @Override
    public boolean deleteById(Integer id) {
        redisTemplate.delete(Role.keyName() + id);
        return this.roleDao.deleteById(id) > 0;
    }
}