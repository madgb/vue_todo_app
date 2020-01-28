<template>
    <div id="app">
        <List :sampleData="sampleData" />
        <Footer :getSampleData="handleSampleData" />
    </div>
</template>

<script>
import { renderParseDate } from "./assets/helper.js";
import { dummyTasks } from "./assets/general.json";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";

export default {
    name: "app",
    data: () => ({
        sampleData: null
    }),
    methods: {
        handleSampleData() {
            const sample = this.handleParseDate(dummyTasks);
            this.sampleData = sample;
        },
        handleParseDate(tasks) {
            return renderParseDate(tasks);
        }
    },
    components: {
        List,
        Footer
    }
};
</script>
<style lang="scss" src="./styles/main.scss"></style>
