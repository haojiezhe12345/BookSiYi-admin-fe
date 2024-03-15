<template>
    <div style="display: flex; flex-direction: column; height: 100%;">

        <div style="display: flex; gap: 8px; padding: 8px;">
            <el-button type="primary" :icon="Plus" @click="editor_new">添加谜题</el-button>
        </div>

        <el-table :data="tableData" table-layout="auto">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="puzzleName" label="名称" />
            <el-table-column prop="clue" label="线索" />
            <el-table-column prop="puzzleAnswer" label="答案" />
            <el-table-column prop="star" label="难度">
                <template #default="scope">
                    <el-icon v-for="i in scope.row.star">
                        <StarFilled />
                    </el-icon>
                </template>
            </el-table-column>
            <el-table-column prop="puzzleType" label="类型">
                <template #default="scope">
                    {{ scope.row.puzzleType == 1 ? '选择' : '填空' }}
                </template>
            </el-table-column>
            <el-table-column prop="puzzleKinds" label="风格" />
            <el-table-column prop="puzzleScore" label="积分" />
            <el-table-column prop="puzzleStatus" label="审核状态">
                <template #default="scope">
                    <el-text :type="scope.row.puzzleStatus == 1 ? 'success' : 'warning'">{{ scope.row.puzzleStatus == 1 ? '通过' : '待审' }}</el-text>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
                <template #default="scope">
                    {{ timeArr2HumanStr(scope.row.createTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="修改时间">
                <template #default="scope">
                    {{ timeArr2HumanStr(scope.row.updateTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="userId" label="userId" />
            <el-table-column label="操作" fixed="right">
                <template #default="scope">
                    <div style="text-wrap: nowrap;">
                        <el-button link type="primary" size="small" @click="editor_show(scope.$index)">编辑</el-button>
                        <el-button link type="primary" size="small" @click="deleteItem(scope.$index)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination style="padding: 8px;" v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 25, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="totalItems" @size-change="fetchData" @current-change="fetchData" />

    </div>

    <el-drawer v-model="editorShowing" :title="`编辑 &quot;${editorData.puzzleName}&quot;`">
        <el-form :model="editorData">

            <el-form-item label="名称">
                <el-input v-model="editorData.puzzleName" />
            </el-form-item>
            <el-form-item label="风格">
                <el-input v-model="editorData.puzzleKinds" />
            </el-form-item>

            <el-form-item label="问题">
                <el-input v-model="editorData.puzzleContent.contentText" />
            </el-form-item>
            <el-form-item label="图片">
                <el-input v-model="editorData.puzzleContent.media" />
            </el-form-item>
            <el-form-item label="线索">
                <el-input v-model="editorData.clue" />
            </el-form-item>
            <el-form-item label="难度">
                <el-rate v-model="editorData.star" />
            </el-form-item>

            <el-form-item label="答案类型">
                <el-radio-group v-model="editorData.puzzleType">
                    <el-radio-button :label="0">填空</el-radio-button>
                    <el-radio-button :label="1">选择</el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="答案" v-show="editorData.puzzleType == 0">
                <el-input v-model="editorData.puzzleAnswerStr" />
            </el-form-item>

            <el-form-item label="答案" v-show="editorData.puzzleType == 1">
                <el-checkbox-group v-model="editorData.puzzleAnswerList">
                    <el-checkbox-button v-for="(obj, index) in editorData.optionList" :label="String.fromCharCode('A'.charCodeAt(0) + index)" />
                </el-checkbox-group>
            </el-form-item>

            <el-form label-width="auto" label-position="left" v-show="editorData.puzzleType == 1">
                <el-form-item>
                    <el-text>选项：</el-text>
                    <el-button type="primary" size="small" :icon="Plus" plain @click="editor_AddOption">添加</el-button>
                </el-form-item>
                <el-form-item v-for="(obj, index) in editorData.optionList" :label="String.fromCharCode('A'.charCodeAt(0) + index)">
                    <div style="display: flex; gap: 8px; width: 100%;">
                        <el-input v-model="obj.selectContent" />
                        <el-button type="danger" plain :icon="Delete" circle @click="editor_DelOption(index)" />
                    </div>
                </el-form-item>
            </el-form>

            <el-form label-width="auto">
                <el-form-item>
                    <el-text>谜题标签：</el-text>
                    <el-button type="primary" size="small" :icon="Plus" plain @click="editor_AddLabel">添加</el-button>
                </el-form-item>
                <el-form-item v-for="(obj, index) in editorData.labelList">
                    <div style="display: flex; gap: 8px; width: 100%;">
                        <el-input v-model="obj.labelName" />
                        <el-button type="danger" plain :icon="Delete" circle @click="editor_DelLabel(index)" />
                    </div>
                </el-form-item>
            </el-form>

            <el-form label-width="auto" label-position="left">
                <el-form-item label="审核状态" v-show="editorType == 'update'">
                    <el-radio-group v-model="editorData.puzzleStatus">
                        <el-radio-button :label="0">待审</el-radio-button>
                        <el-radio-button :label="1">通过</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="展示排序">
                    <el-input v-model="editorData.displayOrder" />
                </el-form-item>
                <el-form-item label="积分">
                    <el-input v-model="editorData.puzzleScore" />
                </el-form-item>
                <el-form-item label="出题者">
                    <el-input v-model="editorData.userId" />
                </el-form-item>
                <el-form-item label="id" v-show="editorType == 'update'">
                    <el-input v-model="editorData.id" />
                </el-form-item>
            </el-form>
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
import { Delete, Plus, StarFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

import { timeArr2HumanStr } from "../../utils";

const router = useRouter();

const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)

const tableData = ref([
    {
        "clue": "clue",
        "createTime": "1970",
        "deleted": 0,
        "displayOrder": 0,
        "id": 0,
        "puzzleAnswer": "answer",
        "puzzleKinds": 0,
        "puzzleName": "name",
        "puzzleScore": 0,
        "puzzleStatus": 0,
        "puzzleType": 0,
        "star": 0,
        "updateTime": "1970",
        "userId": 0,
        "version": 0
    }
])

const editorShowing = ref(false)
const editorType = ref('new')
const editorData = ref({
    "clue": "clue",
    "displayOrder": 0,
    "id": 0,
    "labelList": [
        {
            "labelName": "tag"
        }
    ],
    "optionList": [
        {
            "selectContent": "label",
            "tbSelect": "A"
        }
    ],
    "puzzleAnswerStr": "answer",
    "puzzleAnswerList": [],
    "puzzleContent": {
        "contentText": "question",
        "media": "url",
    },
    "puzzleKinds": 0,
    "puzzleName": "name",
    "puzzleScore": 0,
    "puzzleStatus": 0,
    "puzzleType": 0,
    "star": 0,
    "userId": 0
})

function editor_new() {
    editorType.value = 'new'
    editorData.value = {
        "clue": "",
        "displayOrder": 0,
        "id": 0,
        "labelList": [
        ],
        "optionList": [
        ],
        "puzzleAnswerStr": "",
        "puzzleAnswerList": [],
        "puzzleContent": {
            "contentText": "",
            "media": "",
        },
        "puzzleKinds": 0,
        "puzzleName": "",
        "puzzleScore": 0,
        "puzzleStatus": 0,
        "puzzleType": 0,
        "star": 0,
        "userId": 0
    }
    editorShowing.value = true
}

function editor_show(index: number) {
    axios.get('/admin/puzzle/list/' + tableData.value[index].id)
        .then((response) => {
            if (response.data.code == 1) {
                editorData.value.clue = tableData.value[index].clue
                editorData.value.displayOrder = response.data.data.displayOrder
                editorData.value.id = tableData.value[index].id
                editorData.value.labelList = response.data.data.labelList
                editorData.value.optionList = response.data.data.optionList != null ? response.data.data.optionList : []
                if (response.data.data.puzzleType == 0) {
                    editorData.value.puzzleAnswerStr = response.data.data.puzzleAnswer
                    editorData.value.puzzleAnswerList = []
                } else if (response.data.data.puzzleType == 1) {
                    editorData.value.puzzleAnswerStr = ''
                    try {
                        editorData.value.puzzleAnswerList = JSON.parse(response.data.data.puzzleAnswer)
                    } catch (error) {
                        editorData.value.puzzleAnswerList = []
                    }
                }
                editorData.value.puzzleContent = response.data.data.puzzleContentDTO
                editorData.value.puzzleKinds = response.data.data.puzzleKinds
                editorData.value.puzzleName = response.data.data.puzzleName
                editorData.value.puzzleScore = response.data.data.puzzleScore
                editorData.value.puzzleStatus = tableData.value[index].puzzleStatus
                editorData.value.puzzleType = response.data.data.puzzleType
                editorData.value.star = response.data.data.star
                editorData.value.userId = tableData.value[index].userId

                editorType.value = 'update'
                editorShowing.value = true
            } else {
                ElMessage.error(`获取谜题详细信息失败: ${response.data.msg}`)
            }
        })
}

function editor_AddLabel() {
    editorData.value.labelList.push({
        "labelName": ""
    })
}

function editor_DelLabel(index: number) {
    editorData.value.labelList.splice(index, 1)
}

function editor_AddOption() {
    editorData.value.optionList.push({
        "selectContent": "",
        "tbSelect": "",
    })
}

function editor_DelOption(index: number) {
    editorData.value.optionList.splice(index, 1)
}

function editor_close() {
    editorShowing.value = false
}

function editor_submit() {
    for (var i = 0; i < editorData.value.optionList.length; i++) {
        editorData.value.optionList[i].tbSelect = String.fromCharCode('A'.charCodeAt(0) + i)
    }

    var obj = JSON.parse(JSON.stringify(editorData.value))
    if (obj.puzzleType == 0) {
        obj.puzzleAnswer = obj.puzzleAnswerStr
    } else if (obj.puzzleType == 1) {
        obj.puzzleAnswer = JSON.stringify(obj.puzzleAnswerList)
    }
    delete obj.puzzleAnswerStr
    delete obj.puzzleAnswerList
    //console.log(obj)

    if (editorType.value == 'new') {
        obj.puzzleContentDTO = obj.puzzleContent
        delete obj.puzzleContent
        delete obj.id
        delete obj.puzzleStatus
        axios.put('/admin/puzzle/', obj)
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
        axios.put('/admin/puzzle/update', obj)
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

function deleteItem(index: number) {
    var itemId = tableData.value[index].id
    //console.log(itemId)
    axios.delete('/admin/puzzle/', { data: [itemId] })
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
    axios.post('/admin/puzzle/page', {
        "pageNo": currentPage.value,
        "pageSize": pageSize.value,
    }).then((response) => {
        if (response.data.data === null) {
            router.push('/login')
            return
        }
        tableData.value = response.data.data.records
        totalItems.value = response.data.data.total
    }).catch(() => {
        ElMessage.error('数据加载失败')
    })
};

onMounted(() => {
    fetchData();
});

</script>