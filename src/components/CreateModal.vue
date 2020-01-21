<template>
    <div class="CreateModal">
        <div class="inner">
            <form @submit.prevent="handleSubmit">
                <input v-model="task.title" placeholder="Title"/>
                <input v-model="task.detail" placeholder="Detail Description"/>
                <div class="select-wrapper">
                    <span>Select label color  </span>
                    <select v-model="task.label">
                        <option value="1">Red</option>
                        <option value="2">Yellow</option>
                        <option value="3">Orange</option>
                        <option value="4">Purple</option>
                        <option value="5">Blue</option>
                    </select>
                </div>
                <div class="btn-wrapper">
                    <button type="submit">Create Task</button>
                    <button type="button" @click.prevent="closeModal">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { defaultTaskForm } from "../assets/general.json";
export default {
    name: "CreateModal",
    data: () => ({
        task: {}
    }),
    props: {
        addTask: Function,
        toggleModal: Function
    },
    methods: {
        setDefaultTask() {
            const defaultForm = { ... defaultTaskForm };
            this.task = defaultForm;
        },
        closeModal() {
            this.$props.toggleModal();
        },
        handleSubmit() {
            this.$props.addTask(this.task);
            console.log(this.task)
            this.setDefaultTask();
            this.closeModal();
        }
    },
    created() {
        this.setDefaultTask();
    }
};
</script>
