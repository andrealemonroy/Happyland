<template>
  <section class="center top-60 font-20">
    <br />
    <Row type="flex" justify="center">
      <Col span="20">
        <button
          class="notSignature"
          style="border: none"
          v-if="notSignature"
          @click="signature"
        >
          Firma aquí
        </button>
        <VueSignaturePad
          height="50vh"
          width="50vw"
          v-else
          ref="signaturePad"
          style="margin: auto; border: 1px solid black"
        />
      </Col>
    </Row>
    <br />
    <br />
    <br />
    <br />
    <Row type="flex" justify="space-between">
      <Col span="6"><Button @click="goBack">Regresar</Button> </Col>
      <Col span="6"><Button @click="undo">Volver a intentar</Button> </Col>
      <Col span="6"><Button @click="save">Siguiente</Button> </Col>
    </Row>
  </section>
</template>
<script>
import Vue from "vue";
import VueSignaturePad from "vue-signature-pad";
import "~/assets/css/style.css";
import * as Api from "@/server/index";
import localStorage from "localStorage";
Vue.use(VueSignaturePad);
export default {
  data() {
    return {
      notSignature: true,
      email: "",
      code: "",
      data: ""
    };
  },
  methods: {
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
    async save() {
      if (this.$refs.signaturePad == undefined) {
        this.$Notice.error({
          title: "Debe firmar"
        });
      } else {
        this.$refs.signaturePad.saveSignature();
        const idParent = localStorage.getItem("parentId");
        this.data = (await Api.getFatherById(idParent)).data;
        console.log(this.data + "data");
        this.email = this.data.email;
        this.code = this.data.fatherRandom;
        Api.sendEmail(this.email, this.code)
          .then(res => {
            this.$router.push("/thanks");
          })
          .catch(err => {});
      }
    },
    signature() {
      this.notSignature = false;
    },
    goBack() {
      this.$router.push("/contract");
    }
  }
};
</script>
<style scoped>
.notSignature {
  background-color: #ffffff;
  color: #338dc8;
  border: none;
  height: 50vh;
  font-family: "Montserrat-light";
}
.notSignature:focus {
  outline: 0;
}
</style>
