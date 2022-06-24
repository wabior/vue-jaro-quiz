<template xmlns="http://www.w3.org/1999/html">
    <div class="home container bg-black py-5">

        <h1 class="mb-5">Wins Quiz</h1>
        <button v-if="!quizStarted" @click="startQuiz" class="btn btn-light mb-5">Rozpocznij quiz</button>
        <div v-if="quizStarted">
            <h3 class="pb-3">{{ questions[questionNo]['question'] }}</h3>
            <div class="row mx-auto justify-content-md-center pb-5 gx-5">
                <div v-for="answerOption in answersArray" class="col-md-5 p-4">
                    <button @click="setAnswer(answerOption)" class="btn btn-outline-dark py-3 w-100 text-light">{{ questions[questionNo][`answer_${answerOption}`] }}</button>
                </div>
            </div>
            <button v-if="quizStarted && userAnswer" @click="checkAnswer(); startQuiz()" class="btn btn-outline-dark mb-5">DALEJ</button>
        </div>
    </div>

</template>

<script>
import {ref, watchEffect} from "vue";

const API_URL = 'http://127.0.0.1:8000/api/question/';
// const API_URL = 'http://quiz/api/question/';

export default {
    name: 'HomeView',
    setup() {
        const questions = ref([]),
            questionNo = ref(0),
            quizStarted = ref(false),
            answersArray = ref(['a', 'b', 'c', 'd']),
            userAnswer = ref(null),
            userAnswers = [];

        watchEffect(async () => {
            questions.value = await (await fetch(`${API_URL}`)).json();
        })

        const startQuiz = () => {
            const questionsCount = questions.value.length;

            if (!quizStarted.value) {
                quizStarted.value = true
            }

            if (questionNo.value < questionsCount - 1 && userAnswers.length == questionNo.value) {
                questionNo.value++;
                userAnswer.value = null
            } else if (userAnswers.length < questionNo.value){
                console.log('zaznacz odpowiedź')
            } else {
                console.info('last question');
            }
        }

        const checkAnswer = () => {
            console.log('answer:', userAnswer.value);
            if (userAnswer.value) {
                userAnswers.push(userAnswer.value);
            } else {
                console.log('brak odp')
            }
            console.log('answers:', userAnswers);
        }

        const setAnswer = answer => {
            userAnswer.value = answer;

            console.log('set:', userAnswer.value)

            return answer;
        };

        return {answersArray, questions, questionNo, userAnswer,  checkAnswer, quizStarted, startQuiz, setAnswer}
    }
}
</script>
