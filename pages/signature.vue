<template>
  <section class="center top-60 font-20">
    <Row type="flex" justify="center">
      <Col span="20">
        <button class="notSignature" v-if="notSignature" @click="signature">
          Firma aquí
        </button>
        <VueSignaturePad height="80vh" v-else ref="signaturePad" />
      </Col>
    </Row>
    <Row type="flex" justify="space-between">
      <Button @click="undo">Volver a intentar</Button>
      <Button @click="save">Siguiente</Button>
    </Row>
  </section>
</template>
<script>
import Vue from "vue";
import VueSignaturePad from "vue-signature-pad";
import "~/assets/css/style.css";
Vue.use(VueSignaturePad);
export default {
  data() {
    return {
      notSignature: true
    };
  },
  methods: {
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      console.log(isEmpty);
      console.log(data);
      this.$router.push("/thanks");
    },
    signature() {
      this.notSignature = false;
    }
  }
};
</script>
<style scoped>
.notSignature {
  background-color: #ffffff;
  color: blue;
  border: none;
  height: 80vh;
}
.notSignature:active {
  background-color: #ffffff;
  color: blue;
  border: none;
  height: 80vh;
}
</style>
