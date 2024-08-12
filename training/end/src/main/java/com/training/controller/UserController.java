package com.training.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.training.common.QueryPageParam;
import com.training.pojo.Result;
import com.training.pojo.User;
import com.training.service.UserService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Resource
    private UserService userService;

    //返回所有数据
    @GetMapping("/list")
    public List<User> list() {
        return userService.listAll();
    }

    /**
     * 查询（模糊，精确） like eq
     *
     */
    @PostMapping("/listP")
    public Result listP(@RequestBody User user) {
        LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        //不为空
        if (StringUtils.isNotBlank(user.getName())) {
            lambdaQueryWrapper.like(User::getName, user.getName());
        }
        return Result.success(userService.list(lambdaQueryWrapper));
    }

    @PostMapping("/listPage")
    public Result listPage(@RequestBody QueryPageParam queryPageParam) {
        //打印其他信息
        HashMap param = queryPageParam.getParam();
        //从前端传来的param的  name  sex  进行 lambdaQueryWrapper
        String name = (String) param.get("name");
        String sex = (String) param.get("sex");
//        String roleId = (String w) param.get("roleId");

        /**
         * setCurrent 设置 页数
         * setSize 设置条数
         */
        Page<User> page = new Page<>();
        page.setCurrent(queryPageParam.getPageNum());
        page.setSize(queryPageParam.getPageSize());

        //按照名字查询匹配
        LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        // 判断是否为空
        if (StringUtils.isNotBlank(name) && !"null".equals(name)) {
            lambdaQueryWrapper.like(User::getName, name);
        }
        // 判断是否为空
        if (StringUtils.isNotBlank(sex) && !"null".equals(sex)) {
            lambdaQueryWrapper.like(User::getSex, sex);
        }
        //封装查询结果
        IPage<User> result = userService.page(page, lambdaQueryWrapper);
        return Result.success(result.getRecords(), result.getTotal());
    }
}
