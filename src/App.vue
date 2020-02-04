<template>
    <div id="app">
        <List  />
        <Footer  />
    </div>
</template>

<script>
import { renderParseDate } from "./assets/helper.js";
import { dummyTasks } from "./assets/general.json";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";

export default {
    name: "app",
    components: {
        List,
        Footer
    }
};
</script>
<style lang="scss" src="./styles/main.scss"></style>
