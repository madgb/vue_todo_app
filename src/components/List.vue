<template>
    <div class="list" @click="closeModal">
        <ul>
            <li v-for="(task, index) in tasklist" :key="index">
                <div :class="[task.achieved && 'achieved', 'list-inner']">
                    <button class="remove-button" @click.prevent="removeTask(index)">
                        <FontAwesomeIcon icon="times" />
                    </button>
                    <h3>{{ task.title }}</h3>
                    <div>{{ task.detail }}</div>
                    <div class="due-date" v-if="task.dueDate">
                        <div :class="['inner', handleDueDate(task.dueDate) ? 'fine' : 'overdue']">
                            <span class="icon">
                                <FontAwesomeIcon :icon="['far', 'clock']" />
                            </span>
                            <span class="date">
                                {{ handleDate(task.dueDate) }}
                            </span>
                        </div>
                    </div>
                    <div :class="handleLabel(task.label)"></div>
                    <div class="inner-btn-wrapper">
                        <button @click.prevent="achieveTask(index)">Achieve</button>
                        <button @click.prevent="editCurrTask(index)">Edit</button>
                    </div>
                </div>
            </li>
        </ul>
        <div class="btn-wrapper">
            <button id="new-task" @click.prevent="popCreateModal">New Task</button>
        </div>
        <CreateModal
            v-if="createModal"
            :addTask="addTask"
            :toggleModal="popCreateModal"
            :editTask="editTask"
            :existingTask="existingTask"
            :saveEditTask="saveEditTask"
        />
    </div>
</template>

<script>
import CreateModal from "./CreateModal";
import { renderLabel, renderDate, renderDueDate } from "../assets/helper.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTimes, faClock);

export default {
    name: "List",
    data: () => ({
        tasklist: [],
        createModal: false,
        title: "",
        editTask: false,
        existingTask: null,
        editIndex: null
    }),
    props: {
        tasks: Array
    },
    methods: {
        getTasksFromProps() {
            this.tasklist = this.$props.tasks;
        },
        achieveTask(index) {
            this.tasklist[index].achieved = !this.tasklist[index].achieved;
        },
        editCurrTask(index) {
            const currTask = this.tasklist[index];

            this.editTask = true;
            this.existingTask = currTask;
            this.editIndex = index;

            this.popCreateModal();
        },
        saveEditTask(task) {
            this.tasklist[this.editIndex] = task;
            this.initEditState();
        },
        initEditState() {
            this.editTask = false;
            this.existingTask = null;
            this.editIndex = null;
        },
        popCreateModal() {
            this.createModal = !this.createModal;
        },
        closeModal(event) {
            if (this.createModal && event.target.id === "veil") {
                this.initEditState();
                this.createModal = false;
            }
        },
        addTask(task) {
            this.tasklist.push(task);
        },
        removeTask(index) {
            const confirm = window.confirm("Remove the task?");
            if (confirm) {
                this.tasklist.splice(index, 1);
            }
        },
        handleLabel(index) {
            return renderLabel(index);
        },
        handleDate(date) {
            return renderDate(date);
        },
        handleDueDate(date) {
            return renderDueDate(date);
        }
    },
    created() {
        this.getTasksFromProps();
    },
    components: {
        CreateModal,
        FontAwesomeIcon
    }
};
</script>
