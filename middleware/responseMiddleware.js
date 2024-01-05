function resposeMiddleware(req, res, next) {
  const originalJson = res.json;
  // 重写 res.json 方法
  res.json = function (data, result = 0, message = "") {
    // 包装数据
    const middleData = {
      data: data,
      result: result,
      message: message,
    };

    // 调用原始的 res.json 方法
    originalJson.call(res, middleData);
  };

  // 继续执行下一个中间件或路由处理器
  next();
}

module.exports = resposeMiddleware;
