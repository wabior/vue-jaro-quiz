<template>
    <div class="home container bg-black py-5">
        <h1 class="mb-5">Wins Quiz</h1>
        <Quiz :questions="questions"/>
    </div>
</template>

<script>
    import { ref, watchEffect } from "vue";
    import Quiz from "@/components/Quiz";
    import getQuestions from "@/composables/GetQuestions";
    const API_URL = {'apache': 'http://quiz/api/question', 'laravel': 'http://127.0.0.1:8000/api/question/'};

    export default {
        name: 'App',
        components: { Quiz },
        setup() {
            const { questions, load } = getQuestions(API_URL.apache)

            watchEffect(load)

            return { questions }
        }
    }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #9eb3de;
  background-color: #1c1a1a;
  height: 100vh;
}
.question:hover {
  background-color: rgba(28, 26, 26, 0.95);
  cursor: pointer;
}

.question:active {
  background-color: aquamarine;
}
</style>
