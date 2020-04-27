package com.li.demo.service;

import com.li.demo.entity.Meeting;

import java.util.List;

/**
 * (Meeting)表服务接口
 *
 * @author makejava
 * @since 2020-04-24 19:46:34
 */
public interface MeetingService {

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    Meeting queryById(Integer id);


    /**
     * 新增数据
     *
     * @param meeting 实例对象
     * @return 实例对象
     */
    Meeting insert(Meeting meeting);

    /**
     * 通过实体作为筛选条件查询
     *
     * @param meeting 实例对象
     * @return 对象列表
     */
    List<Meeting> queryAll(Meeting meeting);


    /**
     * 修改数据
     *
     * @param meeting 实例对象
     * @return 实例对象
     */
    Meeting update(Meeting meeting);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    boolean deleteById(Integer id);

}