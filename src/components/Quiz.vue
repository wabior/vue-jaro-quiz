<template>

    <button v-if="!quizStarted && questions.length" @click="startQuiz" class="btn btn-light btn-lg w-50 mt-4">Rozpocznij quiz</button>
    <div v-if="quizStarted" class="questions">
        <p>Pytanie {{ questionNo + 1 }} / {{ questions.length }} </p>
        <p class="py-3 h3">{{ questions[questionNo]['question'] }}</p>
        <div class="row mx-auto justify-content-md-center pb-5 gx-5">
            <div v-for="(answerOption, idx) in answersArray" class="col-md-5 p-4">
                <button @click="setAnswer(idx.toString(), $event)"
                        class="btn btn-outline-dark py-3 w-100 text-light"
                        ref="answerOptions">
                    {{ questions[questionNo][`answer_${answerOption}`] }}
                </button>
            </div>
            <div class="col-md-5 ps-4 btn-container">
                <button v-if="quizStarted && userAnswer" @click="checkAnswer(); startQuiz()" class="btn btn-outline-dark m-0">DALEJ</button>
            </div>
        </div>
    </div>

</template>

<script>
import { ref } from "vue";

export default {
    name: 'HomeView',
    props: ['questions', 'correctAnswer'],
    emits: ['quizFinished', 'answered'],

    setup(props, {emit}) {
        const questionNo = ref(-1),
            quizStarted = ref(false),
            answersArray = ref(['a', 'b', 'c', 'd']),
            userAnswer = ref(null),
            answerOptions = ref([]),
            userAnswers = [];

        const startQuiz = () => {

            if (!quizStarted.value) {
                quizStarted.value = true
            }

            if (questionNo.value + 1 < props.questions.length && userAnswers.length === questionNo.value + 1 ) {
                if (userAnswers.length) emit('answered', questionNo.value + 1, userAnswer.value);
                questionNo.value++;
                userAnswer.value = null
                clearAnswer()
            } else if (userAnswers.length < questionNo.value) {
                console.log('zaznacz odpowiedź')
            } else if (userAnswers.length ===  props.questions.length ){
                console.info('last question');
                emit('answered', questionNo.value + 1, userAnswer.value);
                emit('quizFinished');
            }
        }

        const checkAnswer = () => {
            console.log('answer:', userAnswer.value);
            if (userAnswer.value) {
                userAnswers.push(userAnswer.value);
                console.log('Answers: ', userAnswers)
            } else {
                console.log('brak odp')
            }
        }

        const clearAnswer = () => {
            answerOptions.value.forEach(answerOption => {
                answerOption.classList.remove('bg-primary')
            })
        }

        const setAnswer = (answer, event) => {
            userAnswer.value = answer;

            clearAnswer()

            event.target.classList.toggle('bg-primary')
        };

        return {answersArray, questionNo, userAnswer, checkAnswer, quizStarted, startQuiz, setAnswer, answerOptions}
    }
}
</script>
