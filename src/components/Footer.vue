<template>
    <div class="footer">
        <button @click.prevent="handleSampleData">Get Example Todos</button>
        <button @click.prevent="removeExampleView">Remove Examples</button>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Footer",
    methods: {
        ...mapActions(["handleSampleData"]),
        removeExampleView() {
            location.reload();
        }
    }
};
</script>
