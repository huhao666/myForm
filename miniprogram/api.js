import {
    WCC
} from "./util.js"

// 获取表单列表
export async function getFormList(data) {
    try {
        let res = await WCC({
            url: "formList",
            data
        })
        return res
    } catch (err) {
        return err
    }
}

// 保存表单
export async function saveForm(data) {
    try {
        let res = await WCC({
            url: "saveForm",
            data
        })
        return res
    } catch (err) {
        return err
    }
}

// 获取表单模板
export async function getTemplate(data) {
    try {
        let res = await WCC({
            url: "tempList",
            data
        })
        return res
    } catch (err) {
        return err
    }
}

// 发布表单
export async function publish(data) {
    try {
        let res = await WCC({
            url: "publish",
            data
        })
        return res
    } catch (err) {
        return err
    }
}

// 删除表单模板
export async function deleteTemplate(data) {
    try {
        let res = await WCC({
            url: "deleteTemplate",
            data
        })
        return res
    } catch (err) {
        return err
    }
}

// 删除表单
export async function deleteForm(data) {
    try {
        let res = await WCC({
            url: "deleteForm",
            data
        })
        return res
    } catch (err) {
        return err
    }
}

// 获取表单模板详情
export async function templateDetail(data) {
    try {
        let res = await WCC({
            url: "templateDetail",
            data
        })
        return res
    } catch (err) {
        return res
    }
}


// 结束已发布的表单
export async function endPublish(data) {
    try {
        let res = await WCC({
            url: "endPublish",
            data
        })
        return res
    } catch (err) {
        return err
    }
}

// 表单详情
export async function formDetail(data) {
    try {
        let res = await WCC({
            url: "formDetail",
            data
        })
        return res
    } catch (err) {
        return err
    }
}

// 提交表单
export async function submit(data) {
    try {
        let res = await WCC({
            url: "submit",
            data
        })
        return res
    } catch (err) {
        return err
    }
}

// 获取 input 类型的结果
export async function textValue(data) {
    try {
        let res = await WCC({
            url: "textValue",
            data
        })
        return res
    } catch (err) {
        return err
    }
}

// 获取图标型结果
export async function optionsValue(data) {
    try {
        let res = await WCC({
            url: "optionsValue",
            data
        })
        return res
    } catch (err) {
        return err
    }
}

// 获取表单所有结果
export async function formsDetail(data) {
    try {
        let res = await WCC({
            url: "formsDetail",
            data
        })
        return res
    } catch (err) {
        return err
    }
}

// 获取员工姓名和工号
export async function permission(data) {
    try {
        let res = await WCC({
            url: "permission",
            data
        })
        return res
    } catch (err) {
        return err
    }
}

// 获取表单所有结果
export async function exportExcelData(data) {
    try {
        let res = await WCC({
            url: "exportExcelData",
            data
        })
        return res
    } catch (err) {
        return err
    }
}

// 获取员工是否绑定微信状态
export async function getPermission(data) {
    try {
        let res = await WCC({
            url: "getPermission",
            data
        })
        return res
    } catch (err) {
        return err
    }
}

// 工号未绑定微信 则去绑定
export async function toPermission(data) {
    try {
        let res = await WCC({
            url: "toPermission",
            data
        })
        return res
    } catch (err) {
        return err
    }
}

// 判断表单是否结束
export async function formisEnd(data) {
    try {
        let res = await WCC({
            url: "formisEnd",
            data
        })
        return res
    } catch (err) {
        return err
    }
}