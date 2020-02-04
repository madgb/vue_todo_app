import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

import { renderParseDate } from "../assets/helper.js";
import { dummyTasks } from "../assets/general.json";

export default new Vuex.Store({
    state: {
        createModal: false,
        tasklist: [],
        editTask: false,
        existingTask: null,
        editIndex: null,
        sampleData: null
    },

    getters: {},

    mutations: {
        toggleModal(state) {
            state.createModal = !state.createModal;
        },
        getTasksFromStorage(state) {
            const tasksFromStorage = localStorage.getItem("vueTodoTasks");

            if (tasksFromStorage) {
                const parsed = JSON.parse(tasksFromStorage);
                state.tasklist = renderParseDate(parsed);
            }
        },
        initEditState(state) {
            state.editTask = false;
            state.existingTask = null;
            state.editIndex = null;
        },
        addTask(state, task) {
            state.tasklist.push(task);
            if (!state.sampleView) {
                const stringifiedTask = JSON.stringify(state.tasklist);
                localStorage.setItem("vueTodoTasks", stringifiedTask);
            }
        },
        editCurrTask(state, index) {
            const currTask = state.tasklist[index];

            state.editTask = true;
            state.existingTask = currTask;
            state.editIndex = index;

            state.createModal = !state.createModal;
        },
        removeTask(state, index) {
            const confirm = window.confirm("Remove the task?");
            if (confirm) {
                state.tasklist.splice(index, 1);
                if (!state.sampleView) {
                    const stringifiedTask = JSON.stringify(state.tasklist);
                    localStorage.setItem("vueTodoTasks", stringifiedTask);
                }
            }
        },
        achieveTask(state, index) {
            state.tasklist[index].achieved = !state.tasklist[index].achieved;
            if (!state.sampleView) {
                const stringifiedTask = JSON.stringify(state.tasklist);
                localStorage.setItem("vueTodoTasks", stringifiedTask);
            }
        },
        saveEditTask(state, task) {
            state.tasklist[state.editIndex] = task;
            if (!state.sampleView) {
                const stringifiedTask = JSON.stringify(state.tasklist);
                localStorage.setItem("vueTodoTasks", stringifiedTask);
            }
        },
        handleSampleData(state) {
            const sample = renderParseDate(dummyTasks);
            state.sampleData = sample;
        },
    },

    actions: {
        toggleModal(context) {
            context.commit("toggleModal");
            context.commit("initEditState");
        },
        getTasksFromStorage(context) {
            context.commit("getTasksFromStorage");
        },
        initEditState(context) {
            context.commit("initEditState");
        },
        addTask(context, task) {
            context.commit("addTask", task);
        },
        editCurrTask(context, index) {
            context.commit("editCurrTask", index);
        },
        removeTask(context, index) {
            context.commit("removeTask", index);
        },
        achieveTask(context, index) {
            context.commit("achieveTask", index);
        },
        saveEditTask(context, task) {
            context.commit("saveEditTask", task);
            context.commit("initEditState");
        },
        handleSampleData(context) {
            context.commit("handleSampleData");
        }
    }
});
