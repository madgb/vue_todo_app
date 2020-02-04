<template>
    <div class="list" @click="closeModal">
        <div class="demo" v-if="sampleView">
            <h3>Demo Play</h3>
            <p>Please remove the examples before use the app</p>
        </div>
        <ul>
            <li v-for="(task, index) in currTaskList" :key="index">
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
        <CreateModal v-if="createModal" />
    </div>
</template>

<script>
import { mapState, mapGetter, mapActions } from "vuex";
import CreateModal from "./CreateModal";
import { renderLabel, renderDate, renderDueDate } from "../assets/helper.js";
import { dummyTasks } from "../assets/general.json";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTimes, faClock);

export default {
    name: "List",
    data: () => ({
        currTaskList: [],
        sampleView: false
    }),
    computed: {
        ...mapState(["createModal", "tasklist", "sampleData"])
    },
    watch: {
        sampleData() {
            if (this.sampleData) {
                this.currTaskList = this.sampleData;
                this.sampleView = true;
            } else {
                this.sampleView = false;
            }
        }
    },
    methods: {
        ...mapActions([
            "toggleModal",
            "getTasksFromStorage",
            "initEditState",
            "addTask",
            "editCurrTask",
            "removeTask",
            "achieveTask"
        ]),
        renderTasks() {
            this.currTaskList = this.tasklist;
        },
        popCreateModal() {
            this.toggleModal();
            if (!this.createModal) {
                this.initEditState();
            }
        },
        closeModal(event) {
            if (this.createModal && event.target.id === "veil") {
                this.toggleModal();
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
    mounted() {
        this.getTasksFromStorage();
        this.renderTasks();
    },
    components: {
        CreateModal,
        FontAwesomeIcon
    }
};
</script>
