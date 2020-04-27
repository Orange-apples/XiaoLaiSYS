package com.li.demo.controller;

import com.li.demo.entity.Dept;
import com.li.demo.entity.Emp;
import com.li.demo.entity.Role;
import com.li.demo.service.DeptService;
import com.li.demo.service.EmpService;
import com.li.demo.service.RoleService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * (Emp)表控制层
 *
 * @author makejava
 * @since 2020-04-20 15:57:26
 */
@Controller
@RequestMapping("/emps")
public class EmpController {
    /**
     * 服务对象
     */
    @Resource
    private EmpService empService;
    @Resource
    DeptService deptService;
    @Resource
    RoleService roleService;

    /**
     * 通过主键查询单条数据
     *
     * @param
     * @return 单条数据
     */
    @GetMapping
    public String queryAll(Emp emp, ModelMap modelMap) {
        Long start = new Date().getTime();
        List<Emp> empList = empService.queryAll(emp);
        System.out.println("执行时间："+(new Date().getTime()-start));
        modelMap.addAttribute("empList", empList);
        return "emp/empList";
    }


    @PostMapping
    public String insert(Emp emp) {
        empService.insert(emp);
        return "redirect:/emps";
    }

    @RequestMapping("/getView")
    public String getView(ModelMap modelMap, Integer ids) {
        List<Dept> depts = deptService.queryAll(null);
        List<Role> roles = roleService.queryAll(null);
        modelMap.addAttribute("depts", depts);
        modelMap.addAttribute("roles", roles);
        if (ids != null) {
            Emp emp = empService.queryById(ids);
            modelMap.addAttribute("emp", emp);
        }
        return "emp/empInsert";
    }

    @PutMapping
    public String update(Emp emp) {
        empService.update(emp);
        return "redirect:/emps";
    }

    @DeleteMapping
    public String delete(Integer[] ids) {
        for (int i = 0; i < ids.length; i++) empService.deleteById(ids[i]);
        return "redirect:/emps";
    }
    //////////////////////////////////


}