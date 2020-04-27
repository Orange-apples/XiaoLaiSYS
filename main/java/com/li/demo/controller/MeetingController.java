package com.li.demo.controller;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.li.demo.config.BaseConstant;
import com.li.demo.entity.Emp;
import com.li.demo.entity.Meeting;
import com.li.demo.service.EmpService;
import com.li.demo.service.MeetingService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * (Meeting)表控制层
 *
 * @author makejava
 * @since 2020-04-24 19:46:34
 */
@Controller
@RequestMapping("/meetings")
public class MeetingController {
    /**
     * 服务对象
     */
    @Resource
    private MeetingService meetingService;

    /**
     * 通过主键查询单条数据
     *
     * @return 单条数据
     */
    @GetMapping
    public String queryAll(ModelMap modelMap, Meeting meeting, Integer pages) {
        pages = pages == null ? 1 : pages;
        Page<Object> page = PageHelper.startPage(pages, BaseConstant.PAGESIZE);
        List<Meeting> meetings = meetingService.queryAll(meeting);
        modelMap.addAttribute("meetings", meetings);
        modelMap.addAttribute("page", page);
        modelMap.addAttribute("title", meeting.getTitle());
        return "meeting/meetingList";
    }

    @PostMapping
    public String insert(Meeting meeting) {
        meetingService.insert(meeting);
        return "redirect:/meetings";
    }

    @Resource
    EmpService empService;

    @RequestMapping("/getView")
    public String getView(ModelMap modelMap, Integer ids) {
        List<Emp> emps = empService.queryAll(null);
        modelMap.addAttribute("emps", emps);
        if (ids != null) {
            Meeting meeting = meetingService.queryById(ids);
            modelMap.addAttribute("meeting", meeting);
        }
        return "meeting/meetingInsert";
    }

    @PutMapping
    public String update(Meeting meeting) {
        meetingService.update(meeting);
        return "redirect:/meetings?pages=1";
    }

    @DeleteMapping
    public String delete(Integer[] ids) {
        for (int i = 0; i < ids.length; i++) meetingService.deleteById(ids[i]);
        return "redirect:/meetings?pages=1";
    }


}