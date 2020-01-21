<template>
    <div id="app">
        <List :tasks="tasks" />
    </div>
</template>

<script>
import List from "./components/List.vue";

export default {
	name: "app",
	data: () => ({
		tasks: [
			{
				title: 'First todo',
				detail: 'lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum',
				achieved: false,
				dueDate: null,
				label: 1,
			},
			{
				title: 'Second todo',
				detail: 'lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum',
				achieved: false,
				dueDate: null,
				label: 2,
			},
			{
				title: 'Third todo',
				detail: 'lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum',
				achieved: false,
				dueDate: null,
				label: 3,
			},
			{
				title: 'Fourth todo',
				detail: 'lore ipsum lore ipsum lore ipsum lore ipsum lore ipsum',
				achieved: false,
				dueDate: null,
				label: 4,
			}
		]
	}),
    components: {
        List
    }
};
</script>
<style lang="scss" src="./styles/main.scss"></style>
