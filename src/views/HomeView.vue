<template>
  <div class="home">
    <h1>Wins Quiz</h1>
    <button @click="startQuiz">START</button>
       <h3 v-if="quizStarted">{{ questions[questionNo] }}</h3>
       <h3 v-else>Rozpocznij quiz</h3>
  </div>
</template>

<script>
import {ref, watchEffect} from "vue";

const API_URL = 'http://127.0.0.1:8000/api/question/';

export default {
  name: 'HomeView',
  setup() {
    const questions = ref([]),
        questionNo = ref(0),
        quizStarted = ref(false);

    watchEffect(async () => {
      questions.value = await (await fetch(`${API_URL}`)).json();
    })

    const startQuiz = () => {
      const questionsCount = questions.value.length;

      if (!quizStarted.value) {
        quizStarted.value = true
      }

      if (questionNo.value < questionsCount - 1) {
        questionNo.value++;
      } else {
        console.info('last question');
      }
    }

    return { questions, questionNo, quizStarted, startQuiz }
  }
}
</script>
