<template>
  <div class="container">
    <Logo />
    <div class="card">
      <h1>BIENVENIDO</h1>
      <br />
      <p>Para ingresar a Happyland Adventure debes REGISTRARTE aquí.</p>
      <br />
      <p>
        Sin aceptar estas condiciones de responsabilidad no es posible
        continuar.
      </p>
      <br />
      <Button @click="nextPage">Iniciar</Button>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import "~/assets/css/style.css";
export default {
  components: {
    Logo
  },
  methods: {
    nextPage() {
      this.$router.push("/forWho");
    }
  }
};
</script>

<style>
.card {
  text-align: center;
  font-family: "Montserrat-light";
  font-size: 22px;
}
</style>
