<template>
  <section class="center top-60">
    <h1>INGRESE LA INFORMACIÓN DE SU DIRECCIÓN AQUÍ</h1>
    <Form
      ref="addressForm"
      :model="addressForm"
      :rules="validateForm"
      class="top-60"
    >
      <Row>
        <Col span="8" offset="8">
          <FormItem prop="address" label="Dirección"
            ><Input
              v-model="addressForm.address"
              placeholder="Ingrese su dirección aquí"
            ></Input
          ></FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8" offset="8">
          <FormItem prop="district" label="Distrito" placeholder="Seleccione"
            ><Select v-model="addressForm.district">
              <Option value="Lima">Lima</Option></Select
            ></FormItem
          >
        </Col>
      </Row>
      <Button @click="nextPage">AVANZAR</Button>
    </Form>
  </section>
</template>
<script>
import "~/assets/css/style.css";
import * as Api from "@/server/index";
import localStorage from "localStorage";
export default {
  data() {
    return {
      addressForm: {
        address: "",
        district: ""
      },
      validateForm: {
        address: [
          {
            required: true,
            message: "La dirección es requerida",
            trigger: "blur"
          }
        ],
        district: [
          {
            required: true,
            message: "El distrito es requerido",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    nextPage() {
      this.$refs["addressForm"].validate(async valid => {
        if (valid) {
          try {
            const data = JSON.parse(localStorage.getItem("data"));
            data.line = this.addressForm.address;
            data.district = this.addressForm.district;
            const res = await Api.registerParent(data);
            localStorage.setItem("parentId", res.data._id);
            this.$router.push("/addChild");
          } catch (error) {
            console.log(error);
          }
        } else {
          this.$Notice.error({
            title: "Hay campos inválidos en el formulario"
          });
        }
      });
    }
  }
};
</script>
