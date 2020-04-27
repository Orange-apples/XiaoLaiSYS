package com.li.demo.controller;

import com.li.demo.entity.User;
import com.li.demo.service.UserService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.Duration;

/**
 * (User)表控制层
 *
 * @author makejava
 * @since 2020-04-20 15:57:25
 */
@Controller
@RequestMapping("/login")
public class UserController {
    /**
     * 服务对象
     */
    @Resource
    private UserService userService;

    @Resource
    RedisTemplate redisTemplate;

    /**
     * 通过主键查询单条数据
     *
     * @param user 主键
     * @return 单条数据
     */
    @PostMapping
    public String login(User user, ModelMap map, HttpServletRequest request) {
        String host = request.getRemoteHost();
        User login = userService.login(user);
        if (!redisTemplate.hasKey(host + ":seconds")) login = userService.login(user);
        if (login == null) {//登陆失败
            String msg = "";
            if (!redisTemplate.hasKey(host + ":count") && !redisTemplate.hasKey(host + ":seconds")) {
                redisTemplate.opsForValue().set(host + ":count", 5, Duration.ofSeconds(5 * 60));//5分钟最多登录5次
            }
            Long count = redisTemplate.opsForValue().decrement(host + ":count");
            System.out.println(count);
            if (count > 0) {

                msg = "用户名密码错误，登录失败" + 5 + "次后，将限制登录！";
            } else {
                redisTemplate.delete(host + ":count");
                if (!redisTemplate.hasKey(host + ":seconds"))
                    redisTemplate.opsForValue().set(host + ":seconds", "禁止登陆", Duration.ofSeconds(5 * 60));
                msg = "请" + redisTemplate.boundValueOps(host + ":seconds").getExpire() + "秒后在尝试！";
            }

            map.addAttribute("loginMsg", msg);

        } else {//登录成功
            if (!redisTemplate.hasKey(host + ":seconds")) {
                redisTemplate.delete(host + "count");
                request.getSession().setAttribute("loginUser", login);
                return "redirect:/emps";
            }
        }
        return "login";

    }

    @RequestMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/index.html";
    }

    @ResponseBody
    @RequestMapping("/info")
    public User info(HttpSession session, ModelMap modelMap) {
        User loginUser = (User) session.getAttribute("loginUser");

        return loginUser;
    }

}