<template>
    <div class="CreateModal">
        <div id="veil" class="veil"></div>
        <div class="inner">
            <form @submit.prevent="handleSubmit">
                <button class="close-btn" type="button" @click.prevent="toggleModal">
                    <FontAwesomeIcon icon="times" />
                </button>
                <input v-model="task.title" @input="formValidate" placeholder="Title" />
                <div ref="titleError" class="validate-value" v-if="!validation.title">
                    Title cannot be empty
                </div>
                <textarea v-model="task.detail" @input="formValidate" placeholder="Detail Description"></textarea>
                <div ref="detailError" class="validate-value" v-if="!validation.detail">
                    Detail cannot be empty
                </div>
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
                <div class="due-date">
                    <span class="tag">Due Date</span>
                    <span :class="['date-picker', !validation.date && 'wrong-value']">
                        <DatePicker
                            :value="Date"
                            v-model="task.dueDate"
                            @input="formValidate"
                            :popover="{ visibility: 'click' }"
                            placement="auto"
                        />
                    </span>
                </div>
                <div ref="dateError" class="validate-value" v-if="!validation.date">
                    Due date cannot be in the past
                </div>
                <div class="btn-wrapper">
                    <button type="submit">{{ this.editTask ? "Done" : "Create Task" }}</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetter, mapActions } from "vuex";
import { defaultTaskForm } from "../assets/general.json";
import { renderValidationErrors, validationChecker } from "../assets/helper.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import DatePicker from "v-calendar/lib/components/date-picker.umd";

library.add(faTimes);

export default {
    name: "CreateModal",
    data: () => ({
        task: {},
        validation: {
            title: true,
            detail: true,
            date: true
        }
    }),
    components: {
        FontAwesomeIcon,
        DatePicker
    },
    computed: {
        ...mapState(["editTask", "tasklist", "existingTask"])
    },
    methods: {
        ...mapActions(["toggleModal", "getTasksFromStorage", "initEditState", "addTask", "saveEditTask"]),
        setDefaultTask() {
            const defaultForm = { ...defaultTaskForm };
            this.task = defaultForm;
        },
        setExistingTask() {
            const newTask = { ...this.existingTask };
            this.task = newTask;
        },
        handleSubmit() {
            if (!validationChecker(this.validation)) {
                const errorArr = renderValidationErrors(this.validation);
                errorArr.forEach(eachError => !eachError.errorCheck && this.emphasizeError(eachError.name));
                return;
            }

            this.formValidate();

            if (!validationChecker(this.validation)) {
                return;
            }
            if (!this.editTask) {
                this.addTask(this.task);
            } else {
                this.saveEditTask(this.task);
            }
            this.toggleModal();
        },
        formValidate() {
            const { title, detail, dueDate } = this.task;
            if (dueDate) {
                const dueDateValidate = dueDate.getDate() >= new Date().getDate();
                !dueDateValidate ? (this.validation.date = false) : (this.validation.date = true);
            }

            !title.length ? (this.validation.title = false) : (this.validation.title = true);
            !detail.length ? (this.validation.detail = false) : (this.validation.detail = true);
        },
        emphasizeError(errorElement) {
            const msgEl = this.$refs[errorElement];
            msgEl.classList.add("emphasize-error");
        }
    },
    mounted() {
        if (!this.editTask) {
            this.setDefaultTask();
        } else {
            this.setExistingTask();
        }
    }
};
</script>
