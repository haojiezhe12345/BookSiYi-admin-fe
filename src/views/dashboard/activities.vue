<template>
    <div style="display: flex; flex-direction: column; height: 100%;">

        <div style="display: flex; gap: 8px; padding: 8px;">
            <el-button type="primary" :icon="Plus" @click="editor_new">新增活动</el-button>
            <el-select v-model="filter_status" @change="fetchData" style="width: 120px;">
                <el-option label="所有活动" :value="2" />
                <el-option label="未发布" :value="0" />
                <el-option label="已发布" :value="1" />
            </el-select>
        </div>

        <el-table :data="tableData" table-layout="auto">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="adminId" label="adminId" />
            <el-table-column prop="adminName" label="管理员" />
            <el-table-column prop="contentUrl" label="活动链接" />
            <el-table-column prop="imgUrl" label="图片" />
            <el-table-column prop="publishTime" label="开始时间">
                <template #default="scope">
                    {{ timeArr2HumanStr(scope.row.publishTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间">
                <template #default="scope">
                    {{ timeArr2HumanStr(scope.row.endTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
                <template #default="scope">
                    <el-text :type="scope.row.status == 1 ? 'success' : 'danger'">{{ scope.row.status == 1 ? '已发布' : '未发布' }}</el-text>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
                <template #default="scope">
                    <div style="text-wrap: nowrap;">
                        <el-button link type="primary" size="small" @click="editor_show(scope.$index)">编辑</el-button>
                        <el-button link type="primary" size="small" @click="deleteItem(scope.$index)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

    </div>

    <el-drawer v-model="editorShowing" :title="`编辑 &quot;${editorData.adminName}&quot;`">
        <el-form label-width="auto" label-position="left" :model="editorData" :rules="editorRules" ref="editorRef">

            <el-form-item label="adminId" v-show="editorType == 'update'">
                <el-input v-model="editorData.adminId" />
            </el-form-item>
            <el-form-item label="管理员">
                <el-input v-model="editorData.adminName" />
            </el-form-item>
            <el-form-item label="活动链接">
                <el-input v-model="editorData.contentUrl" />
            </el-form-item>
            <el-form-item label="图片">
                <el-input v-model="editorData.imgUrl" />
            </el-form-item>
            <el-form-item label="开始时间" prop="publishTime">
                <el-date-picker v-model="editorData.publishTime" type="datetime" value-format="YYYY-MM-DDTHH:mm:ss" />
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
                <el-date-picker v-model="editorData.endTime" type="datetime" value-format="YYYY-MM-DDTHH:mm:ss" />
            </el-form-item>
            <el-form-item label="状态" v-show="editorType == 'update'">
                <el-radio-group v-model="editorData.status">
                    <el-radio-button :label="0">未发布</el-radio-button>
                    <el-radio-button :label="1">已发布</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="ID" v-show="editorType == 'update'">
                <el-input v-model="editorData.id" />
            </el-form-item>

        </el-form>

        <template #footer>
            <div style="flex: auto">
                <el-button @click="editor_close">取消</el-button>
                <el-button type="primary" @click="editor_submit">保存</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<style scoped></style>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, FormInstance } from 'element-plus'
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

import { timeArr2ISOStr, timeArr2HumanStr } from "../../utils";

const router = useRouter();

const filter_status = ref(2)

const tableData = ref([
    {
        "adminId": 0,
        "adminName": "",
        "contentUrl": "",
        "endTime": "",
        "id": 0,
        "imgUrl": "",
        "publishTime": "",
        "status": ""
    }
])

const editorShowing = ref(false)
const editorType = ref('new')
const editorData = ref({
    "adminId": 0,
    "adminName": "",
    "contentUrl": "",
    "endTime": "",
    "id": 0,
    "imgUrl": "",
    "publishTime": "",
    "status": ""
})
const editorRef = ref<FormInstance>()
const editorRules = {
    publishTime: [
        { required: true, trigger: 'blur' },
        { validator: validateActivityDates, trigger: 'blur' }
    ],
    endTime: [
        { required: true, trigger: 'blur' },
        { validator: validateActivityDates, trigger: 'blur' }
    ],
};

function validateActivityDates(rule: any, value: any, callback: any): any {
    if (new Date(value) <= new Date()) {
        callback(new Error('必须填未来时间'));
    } else if (new Date(editorData.value.publishTime) >= new Date(editorData.value.endTime)) {
        callback(new Error('开始时间不能晚于结束时间'));
    } else {
        callback()
    }
};

function editor_new() {
    editorType.value = 'new'
    editorData.value = {
        "adminId": 0,
        "adminName": "",
        "contentUrl": "",
        "endTime": "",
        "id": 0,
        "imgUrl": "",
        "publishTime": "",
        "status": ""
    }
    editorShowing.value = true
}

function editor_show(index: number) {
    var obj = JSON.parse(JSON.stringify(tableData.value[index]))
    obj.publishTime = timeArr2ISOStr(obj.publishTime)
    obj.endTime = timeArr2ISOStr(obj.endTime)
    editorData.value = obj
    editorType.value = 'update'
    editorShowing.value = true
}

function editor_close() {
    editorShowing.value = false
}

function editor_submit() {
    //console.log(editorData.value)
    editorRef.value?.validate((valid) => {
        if (valid == true) {
            if (editorType.value == 'new') {
                var obj = JSON.parse(JSON.stringify(editorData.value))
                delete obj.adminId
                delete obj.id
                delete obj.status
                axios.post('/admin/activity/add', obj)
                    .then((response) => {
                        if (response.data.code == 1) {
                            editor_close()
                            fetchData()
                            ElMessage.success('保存成功')
                        } else {
                            ElMessage.error(`保存失败: ${response.data.msg}`)
                        }
                    })
            } else if (editorType.value == 'update') {
                axios.post('/admin/activity/update', editorData.value)
                    .then((response) => {
                        if (response.data.code == 1) {
                            editor_close()
                            fetchData()
                            ElMessage.success('保存成功')
                        } else {
                            ElMessage.error(`保存失败: ${response.data.msg}`)
                        }
                    })
            }
        }
    })
}

function deleteItem(index: number) {
    var itemId = tableData.value[index].id
    //console.log(itemId)
    axios.delete('/admin/activity/delete', { params: { ids: itemId } })
        .then((response) => {
            if (response.data.code == 1) {
                fetchData()
                ElMessage.success('删除成功')
            } else {
                ElMessage.error(`删除失败: ${response.data.msg}`)
            }
        })
}

function fetchData() {
    axios.get('/admin/activity/list', { params: { status: filter_status.value } })
        .then((response) => {
            if (response.data.data === null) {
                router.push('/login')
                return
            }
            tableData.value = response.data.data
        }).catch(() => {
            ElMessage.error('数据加载失败')
        })
};

onMounted(() => {
    fetchData();
});

</script>