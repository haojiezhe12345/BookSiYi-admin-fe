<template>
    <el-form label-width="auto" label-position="left" style="padding: 12px;">
        <el-form-item>
            <el-text>书籍分类：</el-text>
            <el-button type="primary" size="small" :icon="Plus" plain @click="list_add">添加</el-button>
        </el-form-item>
        <el-form-item v-for="(obj, index) in listData" :label="obj.id != -1 ? obj.id.toString() : ' '" :key="obj.id">
            <div style="display: flex;">
                <el-input v-model="obj.categoryName" :disabled="obj.editing != true" @keydown.enter.native="updateItem(index)" />
                <el-button type="warning" plain :icon="Edit" circle @click="list_edit(index)" v-show="obj.editing != true" />
                <el-button type="success" plain :icon="Check" circle @click="updateItem(index)" v-show="obj.editing == true" />
                <el-button type="danger" plain :icon="Delete" circle @click="deleteItem(index)" />
            </div>
        </el-form-item>
    </el-form>
</template>

<style scoped>
button {
    margin-left: 8px !important;
}
</style>

<script setup lang="ts">
import { Delete, Plus, Check, Edit } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const listData = ref([
    {
        "id": -1,
        "categoryName": "",
        'editing': false,
    }
])

function list_edit(index: number) {
    listData.value[index].editing = true
}

function list_add() {
    listData.value.push({
        "id": -1,
        "categoryName": "",
        'editing': true,
    })
}

function updateItem(index: number) {
    var itemId = listData.value[index].id
    //console.log(itemId)
    if (itemId == -1) {
        axios.post('/admin/bookcategory/add', null, { params: { categoryName: listData.value[index].categoryName } })
            .then((response) => {
                if (response.data.code == 1) {
                    fetchData()
                    ElMessage.success('添加成功')
                    listData.value[index].editing = false
                } else {
                    ElMessage.error(`添加失败: ${response.data.msg}`)
                }
            })
    } else {
        axios.put('/admin/bookcategory/update', {
            id: itemId,
            categoryName: listData.value[index].categoryName
        }).then((response) => {
            if (response.data.code == 1) {
                fetchData()
                ElMessage.success('修改成功')
                listData.value[index].editing = false
            } else {
                ElMessage.error(`修改失败: ${response.data.msg}`)
            }
        })
    }
}

function deleteItem(index: number) {
    var itemId = listData.value[index].id
    //console.log(itemId)
    if (itemId == -1) {
        listData.value.splice(index, 1)
        return
    }
    axios.delete('/admin/bookcategory/delete', { params: { ids: itemId } })
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
    axios.get('/admin/bookcategory/getcategoryInfo')
        .then((response) => {
            if (response.data.data === null) {
                router.push('/login')
                return
            }
            listData.value = response.data.data
        }).catch(() => {
            ElMessage.error('数据加载失败')
        })
};

onMounted(() => {
    fetchData();
});

</script>