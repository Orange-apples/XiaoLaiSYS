package com.li.demo.service.impl;

import com.li.demo.config.BaseConstant;
import com.li.demo.dao.MeetingDao;
import com.li.demo.entity.Meeting;
import com.li.demo.service.EmpService;
import com.li.demo.service.MeetingService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Generated;
import javax.annotation.Resource;
import java.time.Duration;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

/**
 * (Meeting)表服务实现类
 *
 * @author makejava
 * @since 2020-04-24 19:46:34
 */
@Service("meetingService")
public class MeetingServiceImpl implements MeetingService {
    @Resource
    private MeetingDao meetingDao;
    @Resource
    RedisTemplate redisTemplate;

    @Resource
    EmpService empService;

    /**
     * 通过ID查询单条数据
     *
     * @param id 主键
     * @return 实例对象
     */
    @Override
    public Meeting queryById(Integer id) {
        if (redisTemplate.hasKey(Meeting.keyName() + id)) {
            return (Meeting) redisTemplate.opsForValue().get(Meeting.keyName() + id);
        } else {
            Meeting meeting = this.meetingDao.queryById(id);
            meeting.setEmp(empService.queryById(meeting.getEmpId()));
            if (meeting != null) redisTemplate.opsForValue().set(Meeting.keyName() + id, meeting, BaseConstant.ofSeconds());
            return meeting;
        }

    }


    /**
     * 新增数据
     *
     * @param meeting 实例对象
     * @return 实例对象
     */
    @Override
    @Generated("id")
    public Meeting insert(Meeting meeting) {
        this.meetingDao.insert(meeting);
        redisTemplate.opsForValue().set(Meeting.keyName() + meeting.getId(), meeting, BaseConstant.ofSeconds());
        redisTemplate.opsForList().leftPush(Meeting.keyName() + "ids", meeting.getId());
        return meeting;
    }

    @Override
    public List<Meeting> queryAll(Meeting meeting) {
        if (!redisTemplate.hasKey(Meeting.keyName() + "ids")) {
            List<Integer> ids = new LinkedList<>();
            ids = Arrays.asList(meetingDao.queryIds(meeting));
            if (ids.size() != 0) redisTemplate.opsForList().leftPushAll(Meeting.keyName() + "ids", ids);
        }
        return meetingDao.queryAll(meeting);
    }

    /**
     * 修改数据
     *
     * @param meeting 实例对象
     * @return 实例对象
     */
    @Override
    public Meeting update(Meeting meeting) {
        this.meetingDao.update(meeting);
        redisTemplate.opsForValue().set(Meeting.keyName() + meeting.getId(), meeting,BaseConstant.ofSeconds());
        return meeting;
    }

    /**
     * 通过主键删除数据
     *
     * @param id 主键
     * @return 是否成功
     */
    @Override
    public boolean deleteById(Integer id) {
        redisTemplate.delete(Meeting.keyName() + id);
        redisTemplate.opsForList().remove(Meeting.keyName() + "ids", 0, id);

        return this.meetingDao.deleteById(id) > 0;
    }
}