<template>
  <section class="center top-60 font-20">
    <Row>
      <VueSignaturePad width="500px" height="500px" ref="signaturePad" />
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
  methods: {
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      console.log(isEmpty);
      console.log(data);
      this.$router.push("/thanks");
    }
  }
};
</script>
