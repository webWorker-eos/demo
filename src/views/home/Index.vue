<template>
	<div>
		Home

		<div>{{ userStore.name }}</div>

		<!-- 跳转到 market 路由 -->
		<router-link to="/market">Market</router-link>
	</div>
</template>

<script setup lang="ts">
import { useUserStoreHook } from '@/store/user';

const userStore = useUserStoreHook();
const a = 1;
console.log(a);
const b = 1;
console.log(b);
fetch('/mock/api/login', {
	method: 'POST'
}).then(async (res: any) => {
	const data = await res.json();
	console.log(data);
});
</script>

<style scoped lang="less">
.home {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	flex-direction: column;
}
</style>
