<template>
  <section class="top-60 center font-20">
    <img src="../assets/images/logo-happy.jpg" class="logo-md" />
    <br />
    <br />
    <h1>¡GRACIAS! HEMOS RECIBIDO TU REGISTRO</h1>
    <br />
    <br />
    <p>UNA COPIA TE LLEGARÁ AL CORREO ELECTRÓNICO</p>
    <br />

    Esta página volverá automáticamente a una nueva página de registro en
    {{ countDown }}
    segundos
    <br />
    <br />
    <br />
    <Button @click="toStart">Nuevo registro</Button>
  </section>
</template>
<script>
import Logo from "~/components/Logo.vue";
import "~/assets/css/style.css";
export default {
  components: {
    Logo
  },
  data() {
    return {
      countDown: 3
    };
  },
  methods: {
    toStart() {
      this.$router.push("/");
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.toStart();
      }
    }
  },
  created() {
    this.countDownTimer();
  }
};
</script>
<style>
.logo-md {
  max-height: 80px !important;
}
</style>
