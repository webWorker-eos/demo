<template>
	<div class="bg"></div>
	<el-container>
		<el-header><Header /></el-header>
		<el-main>
			<el-row :gutter="20" class="layout-row">
				<el-col :span="1"></el-col>
				<el-col :span="22"> <router-view></router-view></el-col>
				<el-col :span="1"></el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script setup lang="ts">
import Header from './comp/Header.vue';
</script>

<style scoped lang="scss">
.el-main,
.el-header {
	display: flex;
	justify-content: center;
	padding: 0;
	flex: 1;
}

.el-header {
	position: sticky;
	top: 0;
	z-index: 10;
}

.layout-row {
	overflow: auto;
	margin-top: 15px;
	width: 100%;
	height: calc(100vh - 105px);
}

.bg {
	position: fixed;
	top: 0;
	left: 0;
	z-index: -1;
	width: 100%;
	height: 100vh;
	// 背景渐变
	background: linear-gradient(to bottom, #0d98ba, #0d97ba12);
}
</style>
