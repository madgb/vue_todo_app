<template>
    <div class="CreateModal">
        <div id="veil" class="veil"></div>
        <div class="inner">
            <form @submit.prevent="handleSubmit">
                <button class="close-btn" type="button" @click.prevent="closeModal">
                    <FontAwesomeIcon icon="times" />
                </button>
                <input v-model="task.title" required placeholder="Title" />
                <textarea v-model="task.detail" required placeholder="Detail Description"></textarea>
                <div class="select-wrapper">
                    <span>Select label color </span>
                    <select v-model="task.label">
                        <option value="1">Red</option>
                        <option value="2">Yellow</option>
                        <option value="3">Orange</option>
                        <option value="4">Purple</option>
                        <option value="5">Blue</option>
                    </select>
                </div>
                <div class="btn-wrapper">
                    <button type="submit">{{ this.$props.editTask ? 'Done' : 'Create Task'}}</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { defaultTaskForm } from "../assets/general.json";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTimes);

export default {
    name: "CreateModal",
    data: () => ({
        task: {}
    }),
    props: {
        addTask: Function,
        toggleModal: Function,
        editTask: Boolean,
        existingTask: Object,
        saveEditTask: Function
    },
    components: {
        FontAwesomeIcon
    },
    methods: {
        setDefaultTask() {
            const defaultForm = { ...defaultTaskForm };
            this.task = defaultForm;
        },
        setExistingTask() {
            const newTask = { ...this.$props.existingTask };
            this.task = newTask;
        },
        closeModal() {
            this.$props.toggleModal();
        },
        handleSubmit() {
            if(!this.$props.editTask) {
                this.$props.addTask(this.task);
            } else {
                this.$props.saveEditTask(this.task);
            }
            this.closeModal();
        }
    },
    mounted() {
        if(!this.$props.editTask) {
            this.setDefaultTask();
        } else {
            this.setExistingTask();
        }
    }
};
</script>
