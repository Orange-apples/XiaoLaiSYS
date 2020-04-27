package com.li.demo.service.impl;

import com.li.demo.config.BaseConstant;
import com.li.demo.dao.DeptDao;
import com.li.demo.entity.Dept;
import com.li.demo.service.DeptService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Generated;
import javax.annotation.Resource;
import java.time.Duration;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

/**
 * (Dept)表服务实现类
 *
 * @author makejava
 * @since 2020-04-20 15:57:26
 */
@Service("deptService")
public class DeptServiceImpl implements DeptService {
    @Resource
    private DeptDao deptDao;
    @Resource
    RedisTemplate redisTemplate;


    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    @Override
    public Dept queryById(Integer id) {
        if (redisTemplate.hasKey(Dept.keyName() + id)) {
            return (Dept) redisTemplate.opsForValue().get(Dept.keyName() + id);
        } else {
            Dept dept = this.deptDao.queryById(id);
            if (dept != null) redisTemplate.opsForValue().set(Dept.keyName() + id, dept, BaseConstant.ofSeconds());
            return dept;
        }

    }

    /**
     * 查询多条数据
     *
     * @return 对象列表
     */
    @Override
    public List<Dept> queryAll(Dept dept) {
//        //初始化返回数组
//        List<Dept> depts = new ArrayList<>();
//        //获取数据库中所有数据的id
        if (!redisTemplate.hasKey(Dept.keyName() + "ids")) {
            List<Integer> ids = new LinkedList<>();
            ids = Arrays.asList(deptDao.queryIds(dept));
            if(ids.size()!=0)  redisTemplate.opsForList().leftPushAll(Dept.keyName() + "ids", ids);
        }
//        for (int i = 0; i < ids.size(); i++) {
//            //遍历ids从缓存或者数据库中查找出对应id的数据；并放入depts中
//            Dept dept1 = this.queryById(ids.get(i));
//            //将数据添加到数组中
//            depts.add(dept1);
//        }


        return deptDao.queryAll(dept);


    }

    /**
     * 新增数据
     *
     * @param dept 实例对象
     * @return 实例对象
     */
    @Override
    @Generated("id")
    public Dept insert(Dept dept) {
        dept.setdNo("DEPT_" + Math.round(Math.random() * 100000));
        this.deptDao.insert(dept);
        redisTemplate.opsForValue().set(Dept.keyName() + dept.getId(), dept, BaseConstant.ofSeconds());
        redisTemplate.opsForList().leftPush(Dept.keyName() + "ids", dept.getId());
        return dept;
    }

    /**
     * 修改数据
     *
     * @param dept 实例对象
     * @return 实例对象
     */
    @Override
    public Dept update(Dept dept) {
        this.deptDao.update(dept);
        redisTemplate.opsForValue().set(Dept.keyName() + dept.getId(), dept,BaseConstant.ofSeconds());
        return dept;
    }

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    @Override
    public boolean deleteById(Integer id) {
        redisTemplate.delete(Dept.keyName() + id);
        redisTemplate.opsForList().remove(Dept.keyName() + "ids", 0, id);

        return this.deptDao.deleteById(id) > 0;
    }
}