<template>
    <div style="display: flex; flex-direction: column; height: 100%;">

        <div style="display: flex; gap: 8px; padding: 8px;">
            <el-button type="primary" :icon="Plus" @click="editor_new">新增书籍</el-button>
        </div>

        <el-table :data="tableData" table-layout="auto">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="bookImg" label="封面">
                <template #default="scope">
                    <img style="max-width: 96px; max-height: 96px;" :src="scope.row.bookImg">
                </template>
            </el-table-column>
            <el-table-column prop="bookName" label="书名" />
            <el-table-column prop="author" label="作者" />
            <el-table-column prop="bookCategories" label="分类">
                <template #default="scope">
                    {{ (() => {
                        for (let obj of bookCategoryData) {
                            if (obj.id == scope.row.bookCategories) return obj.categoryName
                        }
                    })() }}
                </template>
            </el-table-column>
            <el-table-column prop="bookDescription" label="介绍" v-if="false" />
            <el-table-column prop="bookUrl" label="链接">
                <template #default="scope">
                    <el-link type="primary" :href="scope.row.bookUrl" target="_blank">
                        打开
                        <el-icon>
                            <Link />
                        </el-icon>
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column prop="displayOrder" label="排序" />
            <el-table-column prop="permission" label="会员专享">
                <template #default="scope">
                    <el-text :tag="scope.row.permission == 1 ? 'b' : 'span'">{{ scope.row.permission == 1 ? '是' : '否' }}</el-text>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="上架状态">
                <template #default="scope">
                    <el-text :type="scope.row.status == 1 ? 'success' : 'danger'">{{ scope.row.status == 1 ? '已上架' : '未上架' }}</el-text>
                </template>
            </el-table-column>
            <el-table-column prop="createAdminer" label="创建人" />
            <el-table-column prop="updateAdminer" label="修改人" />
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

    <el-drawer v-model="editorShowing" :title="`编辑 &quot;${editorData.bookName}&quot;`">
        <el-form label-width="auto" label-position="left" :model="editorData">

            <el-form-item label="书名">
                <el-input v-model="editorData.bookName" />
            </el-form-item>
            <el-form-item label="封面">
                <el-input v-model="editorData.bookImg" />
            </el-form-item>
            <el-form-item label="作者">
                <el-input v-model="editorData.author" />
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="editorData.bookCategories">
                    <el-option v-for="(item) in bookCategoryData" :label="item.categoryName" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="介绍">
                <el-input v-model="editorData.bookDescription" type="textarea" autosize />
            </el-form-item>
            <el-form-item label="链接">
                <el-input v-model="editorData.bookUrl" />
            </el-form-item>
            <el-form-item label="会员专享">
                <el-radio-group v-model="editorData.permission">
                    <el-radio-button :label="0">否</el-radio-button>
                    <el-radio-button :label="1">是</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="上架状态">
                <el-radio-group v-model="editorData.status">
                    <el-radio-button :label="0">未上架</el-radio-button>
                    <el-radio-button :label="1">已上架</el-radio-button>
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
import { Delete, Plus, Link } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const currentPage = ref(1)
const pageSize = ref(10)
const totalItems = ref(0)

const tableData = ref([
    {
        "author": "",
        "bookCategories": 0,
        "bookDescription": "",
        "bookImg": "",
        "bookName": "",
        "bookUrl": "",
        "createAdminer": 0,
        "displayOrder": 0,
        "id": 0,
        "permission": 0,
        "status": 0,
        "updateAdminer": 0
    }
])

const editorShowing = ref(false)
const editorType = ref('new')
const editorData = ref({
    "author": "",
    "bookCategories": 0,
    "bookDescription": "",
    "bookImg": "",
    "bookName": "",
    "bookUrl": "",
    "id": 0,
    "permission": 0,
    "status": 0
})

const bookCategoryData = ref([
    {
        "categoryName": "dummy",
        "id": 1
    }
])

function editor_new() {
    editorType.value = 'new'
    editorData.value = {
        "author": "",
        "bookCategories": 0,
        "bookDescription": "",
        "bookImg": "",
        "bookName": "",
        "bookUrl": "",
        "id": 0,
        "permission": 0,
        "status": 0
    }
    editorShowing.value = true
}

function editor_show(index: number) {
    var obj = JSON.parse(JSON.stringify(tableData.value[index]))
    delete obj.createAdminer
    delete obj.displayOrder
    delete obj.updateAdminer
    editorData.value = obj
    editorType.value = 'update'
    editorShowing.value = true
}

function editor_close() {
    editorShowing.value = false
}

function editor_submit() {
    //console.log(editorData.value)
    if (editorType.value == 'new') {
        var obj = JSON.parse(JSON.stringify(editorData.value))
        delete obj.id
        axios.post('/admin/book/add', obj)
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
        axios.put('/admin/book/update', editorData.value)
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
    axios.delete('/admin/book/delete', { params: { ids: itemId } })
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
    axios.post('/admin/book/getbookInfo', {
        "pageNo": currentPage.value,
        "pageSize": pageSize.value,
    }).then((response) => {
        if (response.data.data === null) {
            router.push('/login')
            return
        }
        tableData.value = response.data.records
        totalItems.value = response.data.total
    }).catch(() => {
        ElMessage.error('数据加载失败')
    })

    axios.get('/admin/bookcategory/getcategoryInfo')
        .then((response) => {
            bookCategoryData.value = response.data.data
        })
};

onMounted(() => {
    fetchData();
});

</script>