<template>
  <section class="top-60 center font-20">
    <Logo />
    <h1>¡GRACIAS! HEMOS RECIBIDO TU REGISTRO</h1>
    <br />
    <p>Una copia le llegará a su bandeja</p>
    <br />
    <img src="" /><br />
    <p>
      Esta página volverá automáticamente a una nueva página de registro en 3
      segundos
    </p>
    <Button @click="toStart">Nuevo registro</Button>
  </section>
</template>
<script>
export default {
  methods: {
    toStart() {
      this.$router.push("/");
    }
  }
};
</script>
