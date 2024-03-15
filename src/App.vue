<template>
    <div id="rootContainer">
        <div>
            <a href="/" class="headerLink">
                <img src="/logo/bookSiYi.png">
                <span>Book思益-管理系统</span>
            </a>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
#rootContainer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
}

#rootContainer>div:first-child {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: 4px;
    height: 48px;
    padding: 0 20px;
    box-sizing: border-box;
    background-color: #f1f6fa;
}

#rootContainer>div:last-child {
    position: absolute;
    top: 48px;
    left: 0;
    right: 0;
    bottom: 0;
}

.headerLink {
    display: flex;
    align-items: center;
    text-decoration: none;
}

.headerLink>img {
    width: 32px;
}

.headerLink>span {
    font-size: 18px;
    padding: 0 4px;
}

.headerLink:hover>span {
    text-decoration: underline;
}
</style>
