<template>
    <div style="display: flex; flex-direction: column; height: 100%;">

        <div style="display: flex; gap: 8px; padding: 8px;">
            <el-button type="primary" :icon="Plus" @click="editor_new">新增商品</el-button>
        </div>

        <el-table :data="tableData" table-layout="auto">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="productImg" label="图片">
                <template #default="scope">
                    <img style="max-width: 96px; max-height: 96px;" :src="scope.row.productImg">
                </template>
            </el-table-column>
            <el-table-column prop="productName" label="名称" />
            <el-table-column prop="description" label="描述" />
            <el-table-column prop="price" label="价格" />
            <el-table-column prop="categoryId" label="分类">
                <template #default="scope">
                    {{ (() => {
                        for (let obj of goodsCategoryData) {
                            if (obj.id == scope.row.categoryId) return obj.categoryName
                        }
                    })() }}
                </template>
            </el-table-column>
            <el-table-column prop="displayOrder" label="展示优先级" />
            <el-table-column prop="points" label="所需积分" />
            <el-table-column prop="productZone" label="专区">
                <template #default="scope">
                    {{ ['普通', '积分', '会员'][scope.row.productZone] }}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
                <template #default="scope">
                    <el-text :type="scope.row.status == 1 ? 'success' : 'danger'">{{ scope.row.status == 1 ? '已上架' : '未上架' }}</el-text>
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

        <el-pagination style="padding: 8px;" v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 25, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="totalItems" @size-change="fetchData" @current-change="fetchData" />

    </div>

    <el-drawer v-model="editorShowing" :title="`编辑 &quot;${editorData.productName}&quot;`">
        <el-form label-width="auto" label-position="left" :model="editorData">

            <el-form-item label="名称">
                <el-input v-model="editorData.productName" />
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="editorData.description" />
            </el-form-item>
            <el-form-item label="价格">
                <el-input v-model="editorData.price" />
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="editorData.categoryId">
                    <el-option v-for="(item) in goodsCategoryData" :label="item.categoryName" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="展示优先级">
                <el-input v-model="editorData.displayOrder" />
            </el-form-item>
            <el-form-item label="所需积分">
                <el-input v-model="editorData.points" />
            </el-form-item>
            <el-form-item label="图片">
                <el-input v-model="editorData.productImg" />
            </el-form-item>
            <el-form-item label="专区">
                <el-radio-group v-model="editorData.productZone">
                    <el-radio-button :label="0">普通</el-radio-button>
                    <el-radio-button :label="1">积分</el-radio-button>
                    <el-radio-button :label="2">会员</el-radio-button>
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
import { Delete, Plus } from '@element-plus/icons-vue'
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
        "categoryId": 0,
        "description": "",
        "displayOrder": 0,
        "id": 0,
        "points": 0,
        "price": 0,
        "productImg": "",
        "productName": "",
        "productZone": 0,
        "status": 0
    }
])

const editorShowing = ref(false)
const editorType = ref('new')
const editorData = ref({
    "categoryId": 0,
    "description": "",
    "displayOrder": 0,
    "id": 0,
    "points": 0,
    "price": 0,
    "productImg": "",
    "productName": "",
    "productZone": 0,
    "status": 0
})

const goodsCategoryData = ref([
    {
        "categoryName": "dummy",
        "id": 1
    }
])

function editor_new() {
    editorType.value = 'new'
    editorData.value = {
        "categoryId": 0,
        "description": "",
        "displayOrder": 0,
        "id": 0,
        "points": 0,
        "price": 0,
        "productImg": "",
        "productName": "",
        "productZone": 0,
        "status": 0
    }
    editorShowing.value = true
}

function editor_show(index: number) {
    editorData.value = JSON.parse(JSON.stringify(tableData.value[index]))
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
        axios.post('/admin/product/add', obj)
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
        axios.put('/admin/product/update', editorData.value)
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
    var idToDelete = tableData.value[index].id
    //console.log(idToDelete)
    axios.delete('/admin/product/delete', { data: [idToDelete] })
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
    axios.post('/admin/product/getPdInfo', {
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

    axios.get('/admin/category/getPcInfo')
        .then((response) => {
            goodsCategoryData.value = response.data.data
        })

};

onMounted(() => {
    fetchData();
});

</script>