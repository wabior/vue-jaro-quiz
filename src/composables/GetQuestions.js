import {ref} from "vue";

const GetQuestions = (url) => {
    const questions = ref([]);

    const load = async () => {

        try {
            let data = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            });
            if (!data.ok) {
                throw Error('Brak pytań');
            }
            questions.value = await data.json();
        } catch (err) {
            console.error(err.message)
        }
    }
    return { questions, load }
}

export default GetQuestions