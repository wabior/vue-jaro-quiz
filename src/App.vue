<template>
    <h1 class="pt-5 pb-4">Wins Quiz</h1>

    <div class="home container">

        <Quiz :questions="questions"
              :correctAnswer="answeredCorrectly"
              @quizFinished="resultsPage"
              @answered="answered"
              v-if="!quizFinished
        "/>
        <div v-if="quizFinished" class="d-flex flex-column">
            <p>Dziękujemy za udział w Quizie</p>
            <h2>Twój wynik to <b>{{ score }}</b> / {{ questions.length}} </h2>
        </div>
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
            const quizFinished = ref(false);
            const answeredCorrectly = ref(null);
            let score = ref(0);

            if (!API_URL) {
                console.error('no .env api url');
            }

            const resultsPage = () => {
                quizFinished.value = true;
            }

            const answered = async (questionNo, answer) => {

                const { correctAnswer, check } = CheckAnswer(API_URL, questionNo, answer);
                await check();

                answeredCorrectly.value = correctAnswer.value

                if (answeredCorrectly.value) {
                    score.value++;
                }
            };



            const { questions, load } = GetQuestions(API_URL)

            watchEffect(load)

            return { questions, resultsPage, quizFinished, answered, answeredCorrectly, score }
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
  background-color: #121111;
  height: 100vh;
}
.home {
    align-items: center;
    background-color : #121111;
    display: flex;
    flex-direction: column;
}
.btn-container {
    height: 50px;
}
.question:hover {
  background-color: rgba(28, 26, 26, 0.95);
  cursor: pointer;
}

.question:active {
  background-color: aquamarine;
}
</style>
