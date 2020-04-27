package com.li.demo.service.impl;

import com.li.demo.config.BaseConstant;
import com.li.demo.dao.EmpDao;
import com.li.demo.entity.Emp;
import com.li.demo.service.DeptService;
import com.li.demo.service.EmpService;
import com.li.demo.service.RoleService;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Generated;
import javax.annotation.Resource;
import java.time.Duration;
import java.util.*;

/**
 * (Emp)表服务实现类
 *
 * @author makejava
 * @since 2020-04-20 15:57:26
 */
@CacheConfig(cacheNames = "user")
@Service("empService")
public class EmpServiceImpl implements EmpService {
    @Resource
    private EmpDao empDao;

    @Resource
    RedisTemplate redisTemplate;


    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    @Override
    public Emp queryById(Integer id) {
        if (redisTemplate.hasKey(Emp.keyName() + id)) {
            return (Emp) redisTemplate.opsForValue().get(Emp.keyName() + id);
        } else {
            Emp emp = empDao.queryById(id);
            //关联部门和职位的数据，从缓存中拿
            emp.setDept(deptService.queryById(emp.getDeptId()));
            emp.setRole(roleService.queryById(emp.getRoleId()));
            if (emp != null) {
                redisTemplate.opsForValue().set(Emp.keyName() + id, emp, BaseConstant.ofSeconds());
            }
            return emp;
        }
    }

    /**
     * 查询多条数据
     *
     * @param offset 查询起始位置
     * @param limit  查询条数
     * @return 对象列表
     */
    @Override
    public List<Emp> queryAllByLimit(int offset, int limit) {
        return this.empDao.queryAllByLimit(offset, limit);
    }

    /**
     * 新增数据
     *
     * @param emp 实例对象
     * @return 实例对象
     */
    @Override
    @Generated("id")
    public Emp insert(Emp emp) {
        emp.setEmpNo("EMP_" + Math.round(Math.random() * 1000000));
        this.empDao.insert(emp);
        Emp emp1 = empDao.queryById(emp.getId());
        redisTemplate.opsForValue().set(Emp.keyName() + emp.getId(),BaseConstant.ofSeconds());
        redisTemplate.opsForList().leftPush(Emp.keyName() + "ids", emp1.getId());
        return emp;
    }

    /**
     * 修改数据
     *
     * @param emp 实例对象
     * @return 实例对象
     */
    @Override
    public Emp update(Emp emp) {
        this.empDao.update(emp);
        redisTemplate.opsForValue().set(Emp.keyName() + emp.getId(), emp,BaseConstant.ofSeconds());
        return emp;
    }

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    @Override
    public boolean deleteById(Integer id) {
        redisTemplate.delete(Emp.keyName() + id);
        redisTemplate.opsForList().remove(Emp.keyName() + "ids", 0, id);
        return this.empDao.deleteById(id) > 0;
    }

    @Resource
    DeptService deptService;
    @Resource
    RoleService roleService;

    @Override
    /**
     * 查询所有emp
     * 首先查询数据库中所有数据的id，然后根据id查询对应的数据，放入缓存，并添加到返回的数组集合中；
     * **/
    public List<Emp> queryAll(Emp emp) {

//        //获取数据库中所有数据的id
        if (!redisTemplate.hasKey(Emp.keyName() + "ids")) {
            List<Integer> ids = new LinkedList<>();
            ids = Arrays.asList(empDao.queryIds(emp));
            if(ids.size()!=0)  redisTemplate.opsForList().leftPushAll(Emp.keyName() + "ids", ids);
        }

        //用一对多关联：执行时间540
        return empDao.queryAll(emp);


        //不用多对一关联：执行时间887

//
//        List<Emp> emps = empDao.queryAll(emp);
//        List<Emp> empList = new ArrayList<>(emps.size()+1);
//        Iterator<Emp> it = emps.iterator();
//        while(it.hasNext()){
//            Emp next = it.next();
//            next.setDept(deptService.queryById(next.getDeptId()));
//            next.setRole(roleService.queryById(next.getRoleId()));
//            empList.add(next);
//        }
//        return empList;
    }


}