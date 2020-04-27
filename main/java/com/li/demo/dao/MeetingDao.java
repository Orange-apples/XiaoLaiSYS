package com.li.demo.dao;

import com.li.demo.entity.Meeting;

import java.util.List;

/**
 * (Meeting)表数据库访问层
 *
 * @author makejava
 * @since 2020-04-24 19:46:34
 */
public interface MeetingDao {

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    Meeting queryById(Integer id);


    /**
     * 通过实体作为筛选条件查询
     *
     * @param meeting 实例对象
     * @return 对象列表
     */
    List<Meeting> queryAll(Meeting meeting);

    /**
     * 新增数据
     *
     * @param meeting 实例对象
     * @return 影响行数
     */
    int insert(Meeting meeting);

    /**
     * 修改数据
     *
     * @param meeting 实例对象
     * @return 影响行数
     */
    int update(Meeting meeting);

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 影响行数
     */
    int deleteById(Integer id);

    Integer[] queryIds(Meeting meeting);
}