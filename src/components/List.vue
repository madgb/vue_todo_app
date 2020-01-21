<template>
    <div class="list">
        <ul>
            <li v-for="(task, index) in tasklist" :key="index">
                <div :class="task.achieved && 'achieved'">
                    <h3>{{ task.title }}</h3>
                    <div>{{ task.detail }}</div>
                    <div>{{ task.dueDate }}</div>
                    <div :class="renderLabel(task.label)"></div>
                    <div>
                        <button @click.prevent="achieveTask(index)">Achieve</button>
                        <button @click.prevent="removeTask(index)">Remove</button>
                    </div>
                </div>
            </li>
        </ul>
        <div>
            <button @click.prevent="popCreateModal">New Task</button>
        </div>
        <CreateModal v-if="createModal" :addTask="addTask" :toggleModal="popCreateModal"/>
    </div>
</template>

<script>

import CreateModal from "./CreateModal";

export default {
    name: "List",
    data: () => ({
        tasklist: [],
        createModal: false,
        title: ""
    }),
    props: {
        tasks: Array
    },
    methods: {
        getTasksFromProps() {
            this.tasklist = this.$props.tasks;
        },
        achieveTask(index) {
            this.tasklist[index].achieved = !this.tasklist[index].achieved
        },
        popCreateModal() {
            this.createModal = !this.createModal;
        },
        addTask(task) {
            this.tasklist.push(task);
        },
        removeTask(index) {
            const confirm = window.confirm("Remove the task?");
            if(confirm) {
                this.tasklist.splice(index, 1);
            }
        },
        renderLabel(labelIndex) {
            const index = Number(labelIndex);
            if(index === 1) {
                return 'red-bg label';
            }
            if(index === 2) {
                return 'yellow-bg label';
            }
            if(index === 3) {
                return 'orange-bg label';
            }
            if(index === 4) {
                return 'purple-bg label';
            }
            if(index === 5) {
                return 'blue-bg label';
            }
        }
    },
    created() {
        this.getTasksFromProps();
    },
    components: {
        CreateModal
    }
};
</script>

