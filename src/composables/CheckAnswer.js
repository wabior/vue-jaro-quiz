import {ref} from "vue";

const CheckAnswer = (url, questionNo, answer) => {
    const correctAnswer = ref(null);
    const question = ref(null);

    const check = async () => {

        try {
            let data = await fetch(`${url}/${questionNo}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!data.ok) {
                throw Error('Błąd pobierania odpowiedzi');
            }
            question.value = await data.json();
            correctAnswer.value = question.value.answer_correct === answer;

        } catch (err) {
            console.error(err.message)
        }
    }

    return { correctAnswer, check }
}

export default CheckAnswer