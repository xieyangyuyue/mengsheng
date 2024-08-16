package com.training.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.training.common.QueryPageParam;
import com.training.pojo.Result;
import com.training.service.RecordService;
import com.training.service.TrainingorderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/record")
@CrossOrigin
class RecordController {
 @Autowired
 private RecordService recordService;
 @Autowired
 private TrainingorderService trainingorderService;

 @PostMapping("/listPageSelf")

 public Result listPageSelf(@RequestBody QueryPageParam queryPageParam) {

  //打印其他信息
  HashMap param = queryPageParam.getParam();
  String name = (String) param.get("name");
  String goodstype = (String) param.get("goodstype");
  String storage = (String) param.get("storage");


  Page<Record> page = new Page<>();
  page.setCurrent(queryPageParam.getPageNum());
  page.setSize(queryPageParam.getPageSize());

  //按照名字查询匹配
  QueryWrapper<Record> QueryWrapper = new QueryWrapper<>();
  QueryWrapper.apply(" record.goods = goods.id and goods.storage = storage.id and goods.goodsType = goodstype.id ");
  if (StringUtils.isNotBlank(name) && !"null".equals(name)) {
   QueryWrapper.like("goods.name", name);
  }
  if (StringUtils.isNotBlank(goodstype) && !"null".equals(goodstype)) {
   QueryWrapper.like("storage.id", goodstype);
  }
  if (StringUtils.isNotBlank(storage) && !"null".equals(storage)) {
   QueryWrapper.like("goodstype.id", storage);
  }
  //封装查询结果
  IPage result = recordService.listPageSelf(page, QueryWrapper);
  return Result.success(result.getRecords(), result.getTotal());
 }
}

