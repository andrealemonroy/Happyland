<template>
  <section class="center vertical-center top-60 font-20">
    <h1>Registro de responsabilidad</h1>
    <br />
    <h3>
      ESTE PROCESO TE PERMITIRÁ FIRMAR DIGITALMENTE TU REGISTRO DE
      RESPONSABILIDAD.
    </h3>
    <br />
    <p class="justify" style="margin: 20px 100px">
      Ten en cuenta que debes tener al menos 18 años para poder solicitar el
      REGISTRO de responsabilidad. Si no tienes 18 años, solicita a tus padres o
      tutor que completen este proceso.
    </p>
    <br />
    <br />
    <Row type="flex" justify="space-between">
      <Col span="6"
        ><Button @click="goBack">
          <Icon type="ios-arrow-back" />Regresar</Button
        >
      </Col>
      <Col span="6"
        ><Button @click="nextPage">Continuar el registro</Button>
      </Col>
    </Row>
  </section>
</template>
<script>
import "~/assets/css/style.css";

export default {
  methods: {
    nextPage() {
      this.$router.push({ path: "/register" });
    },
    goBack() {
      this.$router.push("/");
    }
  }
};
</script>
