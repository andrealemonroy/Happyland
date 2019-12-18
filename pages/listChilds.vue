<template>
  <section class="center top-60 font-20">
    <h1>REVISION DE NIÑOS BAJO TUTELA</h1>
    <br />
    <p>
      A continuación se muestra la lista de niños registrados. Toque el botón
      Guardar en la parte superior derecha para continuar, o agregue niños
      adicionales
    </p>
    <br />
    <br />
    <Button @click="registerChild">AGREGAR UN NIÑO/A</Button>
    <Button @click="nextPage">Avanzar</Button>
  </section>
</template>
<script>
import "~/assets/css/style.css";
export default {
  methods: {
    registerChild() {
      this.$router.push("/childInfo");
    },
    nextPage() {
      this.$router.push("/contract");
    }
  }
};
</script>
