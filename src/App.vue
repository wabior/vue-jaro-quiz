<template>
    <div class="home container bg-black py-5">
        <h1 class="mb-5">Wins Quiz</h1>
        <Quiz />
    </div>
</template>

<script>
    import Quiz from "@/components/Quiz";

    export default {
        name: 'App',
        components: { Quiz }
    }
</script>/

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
