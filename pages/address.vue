<template>
  <section class="center top-60">
    <h1>INGRESE LA INFORMACIÓN DE SU DIRECCIÓN AQUÍ</h1>
    <Form
      ref="addressForm"
      :model="addressForm"
      :rules="validateForm"
      class="top-60"
    >
      <Row align="center">
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
      <Button @click="nextPage">Avanzar</Button>
    </Form>
  </section>
</template>
<script>
import "~/assets/css/style.css";
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
          this.$router.push("/addChild");
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
