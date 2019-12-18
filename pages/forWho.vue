<template>
  <section class="center vertical-center top-60 font-20">
    <h1>Registro de responsabilidad</h1>
    <br />
    <h3>
      ESTE PROCESO LE PERMITIRÁ FIRMAR DIGITALMENTE SU REGISTRO DE
      RESPONSABILIDAD.
    </h3>
    <br />
    <p>
      Tenga en cuenta que debe tener al menos 18 años para poder solicitar un
      REGISTRO de responsabilidad. Si no tiene 18 años, solicite a sus padres o
      tutor legal que completen este proceso.
    </p>
    <br />
    <h3>
      ¿PARA QUIÉN FIRMAS EL CONTRATO DE RESPONSABILIDAD?
    </h3>
    <br />
    <Button @click="nextPage">Para mí</Button> <br />
    <Button @click="nextPage">Para mí y niños</Button>
  </section>
</template>
<script>
import "~/assets/css/style.css";
export default {
  methods: {
    nextPage() {
      this.$router.push({ path: "/register" });
    }
  }
};
</script>
