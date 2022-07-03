<template>
    <div class="home container bg-black py-5">
        <h1 class="mb-5">Wins Quiz</h1>
        <Quiz :questions="questions"
              :correctAnswer="answeredCorrectly"
              @quizFinished="resultsPage"
              @answered="answered"
              v-if="!quizFinished
        "/>
        <h2 v-if="quizFinished">KONIEC</h2>
    </div>
</template>

<script>
    import { ref, watchEffect } from "vue";
    import Quiz from "@/components/Quiz";
    import CheckAnswer from "@/composables/CheckAnswer";
    import GetQuestions from "@/composables/GetQuestions";

    const API_URL = (process.env.VUE_APP_API_URL ?? null);

    export default {
        name: 'App',
        components: { Quiz },
        setup() {
            let quizFinished = ref(false);
            let answeredCorrectly = ref(null);

            if (!API_URL) {
                console.error('no .env api url');
            }

            const resultsPage = () => {
                quizFinished.value = true;
                console.log('finished')
            }

            const answered = async (questionNo, answer) => {

                const { correctAnswer, check } = CheckAnswer(API_URL, questionNo, answer);
                await check();

                answeredCorrectly.value = correctAnswer.value
            };



            const { questions, load } = GetQuestions(API_URL)

            watchEffect(load)

            return { questions, resultsPage, quizFinished, answered, answeredCorrectly }
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
