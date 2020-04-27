package com.li.demo.controller;

import com.li.demo.entity.Dept;
import com.li.demo.service.DeptService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * (Dept)表控制层
 *
 * @author makejava
 * @since 2020-04-20 15:57:26
 */
@Controller
@RequestMapping("/depts")
public class DeptController {
    /**
     * 服务对象
     */
    @Resource
    private DeptService deptService;

    /**
     * 通过主键查询单条数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @GetMapping
    public String queryAll(ModelMap modelMap, Integer pages, Dept dept) {
        pages = pages == null ? 1 : pages;
        // Page<Object> page = PageHelper.startPage(pages, BaseConstant.PAGESIZE);
        long start = new Date().getTime();
        List<Dept> depts = deptService.queryAll(dept);
        long end = new Date().getTime();
        System.out.println("执行时间：" + (end - start));
        modelMap.addAttribute("depts", depts);
        // modelMap.addAttribute("page",page);
        modelMap.addAttribute("name", dept.getName());
        return "/dept/deptList";
    }

    @PostMapping
    public String insert(Dept dept) {
        deptService.insert(dept);
        return "redirect:/depts?pages=1";
    }

    @RequestMapping("/getView")
    public String getView(ModelMap modelMap, Integer ids) {
        System.out.println(ids);
        if (ids != null) {
            Dept dept = deptService.queryById(ids);
            modelMap.addAttribute("dept", dept);
        }
        return "dept/deptInsert";
    }

    @PutMapping
    public String update(Dept dept) {
        deptService.update(dept);
        return "redirect:/depts?pages=1";
    }

    @DeleteMapping
    public String delete(Integer[] ids) {
        for (int i = 0; i < ids.length; i++) deptService.deleteById(ids[i]);
        return "redirect:/depts?pages=1";
    }


}