<template>
    <el-menu active-text-color="#ffd04b" background-color="#545c64" text-color="#fff" :router="true" style="position: absolute; top: 0; left: 0; bottom: 0; width: 200px; overflow: auto;">

        <el-menu-item index="/dashboard/puzzles">
            <el-icon>
                <Opportunity />
            </el-icon>
            <span>谜题管理</span>
        </el-menu-item>

        <el-sub-menu index="books">
            <template #title>
                <el-icon>
                    <Reading />
                </el-icon>
                <span>书籍管理</span>
            </template>
            <el-menu-item index="/dashboard/bookCategories">
                <el-icon>
                    <MenuIcon />
                </el-icon>
                <span>书籍分类</span>
            </el-menu-item>
            <el-menu-item index="/dashboard/books">
                <el-icon>
                    <Memo />
                </el-icon>
                <span>书籍列表</span>
            </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="goods">
            <template #title>
                <el-icon>
                    <ShoppingCart />
                </el-icon>
                <span>商品管理</span>
            </template>
            <el-menu-item index="/dashboard/goodsCategories">
                <el-icon>
                    <MenuIcon />
                </el-icon>
                <span>商品分类</span>
            </el-menu-item>
            <el-menu-item index="/dashboard/goods">
                <el-icon>
                    <ShoppingBag />
                </el-icon>
                <span>商品列表</span>
            </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/dashboard/activities">
            <el-icon>
                <Flag />
            </el-icon>
            <span>活动管理</span>
        </el-menu-item>

    </el-menu>

    <main style="position: absolute; top: 0; left: 200px; right: 0; bottom: 0; overflow: auto;">
        <router-view></router-view>
    </main>
</template>

<script setup lang="ts">
import {
    Opportunity,
    ShoppingCart,
    Reading,
    Memo,
    ShoppingBag,
    Menu as MenuIcon,
    Flag,
} from '@element-plus/icons-vue'

</script>

<style scoped></style>