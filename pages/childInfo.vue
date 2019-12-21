<template>
  <section class="center top-60 font-20">
    <h1>INGRESA LA INFORMACION DEL NIÑO</h1>
    <Form
      ref="childForm"
      :model="childForm"
      :rules="validateForm"
      class="top-60"
    >
      <Row type="flex" justify="space-around">
        <Col span="7">
          <FormItem prop="name" label="Nombre"
            ><Input v-model="childForm.name" placeholder="ej. Andrea"></Input
          ></FormItem>
        </Col>
        <Col span="7">
          <FormItem prop="surname" label="Apellidos"
            ><Input
              v-model="childForm.surname"
              placeholder="ej. Sánchez López"
            ></Input
          ></FormItem>
        </Col>
        <Col span="7">
          <FormItem prop="dni" label="DNI del niño"
            ><Input v-model="childForm.dni" placeholder="ej. 12345678"></Input
          ></FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-around">
        <Col span="7">
          <FormItem prop="gender" label="Género">
            <RadioGroup v-model="childForm.gender">
              <Radio label="female">Femenino</Radio>
              <Radio label="male">Masculino</Radio>
            </RadioGroup>
          </FormItem>
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
    const validatePhoneNumber = (rule, value, callback) => {
      const reg = new RegExp("^([0-9]{9,})$");
      if (value === "" || !value) {
        callback(new Error("Número telefónico es requerido"));
      } else if (value.length !== 9) {
        callback(new Error("Debe ser sólo 9 dígitos"));
      } else if (!reg.test(value)) {
        callback(new Error("Formato número telefónico es inválido"));
      } else {
        callback();
      }
    };
    const validateidentityDocumentNumber = (rule, value, callback) => {
      // /[^0-9]/gi
      const reg = new RegExp("^([A-Z0-9]{8,9})$");
      if (value === "") {
        callback(new Error("No puede estar vacío"));
      } else if (value.length !== 8 || isNaN(value)) {
        callback(new Error("El número de documento debe ser de 8 números"));
      } else if (!reg.test(value)) {
        callback(new Error("Formato inválido"));
      } else {
        callback();
      }
    };
    return {
      childForm: {
        name: "Adriana",
        surname: "Monroy",
        dni: "76282636",
        gender: "female"
      },
      validateForm: {
        name: [
          {
            required: true,
            message: "El nombre es requerido",
            trigger: "blur"
          }
        ],
        surname: [
          {
            required: true,
            message: "El apellido es requerido",
            trigger: "blur"
          }
        ],
        dni: [
          {
            required: true,
            validator: validateidentityDocumentNumber,
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "El género es requerido", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async nextPage() {
      this.$refs["childForm"].validate(async valid => {
        if (valid) {
          try {
            const res = await Api.registerChild(this.childForm);
            console.log("registro hijo" + res);
            const idChild = res._id;
            const idParent = JSON.parse(localStorage.getItem("data"))._id;
            console.log("id Parent" + idParent);
            const childToParent = await Api.registerChildToParent(
              idCHild,
              idParent
            );
            console.log("registro familiar - hijo" + childToParent);
          } catch (error) {
            console.log("error: " + error);
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
