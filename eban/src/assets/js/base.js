// 封装本地存储 localStorage相关函数

export const setLocal  = function (key,value){
    localStorage.setItem(key,JSON.stringify(value))
}

export const getLocal = function (key,value){
    return JSON.parse(localStorage.getItem(key))
}

