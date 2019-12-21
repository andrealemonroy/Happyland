<template>
  <section class="center top-60 font-20">
    <h1>INGRESE SU INFORMACIÓN AL REGISTRO</h1>
    <Form
      ref="parentForm"
      :model="parentForm"
      :rules="validateForm"
      class="top-60"
      label-position="top"
    >
      <Row type="flex" justify="space-around">
        <Col span="7">
          <FormItem prop="names" label="Nombre"
            ><Input v-model="parentForm.names" placeholder="ej. Andrea"></Input
          ></FormItem>
        </Col>
        <Col span="7">
          <FormItem prop="surname" label="Apellido"
            ><Input
              v-model="parentForm.surname"
              placeholder="ej. Sánchez"
            ></Input
          ></FormItem>
        </Col>
        <Col span="7">
          <FormItem prop="identityDocumentNumber" label="DNI"
            ><Input
              v-model="parentForm.identityDocumentNumber"
              placeholder="ej. 12345678"
            ></Input
          ></FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-around">
        <Col span="7">
          <FormItem prop="email" label="Correo electrónico"
            ><Input
              v-model="parentForm.email"
              placeholder="ej. happyland@gmail.com"
            ></Input
          ></FormItem>
        </Col>
        <Col span="7">
          <FormItem prop="phoneNumber" label="Celular"
            ><Input
              v-model="parentForm.phoneNumber"
              placeholder="987654321"
            ></Input
          ></FormItem>
        </Col>
        <Col span="7">
          <FormItem prop="gender" label="Género">
            <RadioGroup v-model="parentForm.gender">
              <Radio label="female">Femenino</Radio>
              <Radio label="male">Masculino</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-around">
        <Col span="11">
          <FormItem
            prop="specialOffer"
            label="Me gustaría recibir ofertas especiales a través de:"
          >
            <RadioGroup v-model="parentForm.specialOffer">
              <Radio label="mail">Email</Radio>
              <Radio label="sms">Mensaje de texto</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="11"> </Col>
      </Row>
      <br />
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
      parentForm: {
        names: "Andrea",
        surname: "Monroy",
        identityDocumentNumber: "76282636",
        email: "andreale17@icloud.com",
        phoneNumber: "978893562",
        gender: "female",
        specialOffer: "mail"
      },
      validateForm: {
        names: [
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
        email: [
          {
            required: true,
            message: "El correo electrónico es requerido",
            trigger: "blur"
          },
          { type: "email", message: "Formato inválido", trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, validator: validatePhoneNumber, trigger: "change" }
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
        ],
        specialOffer: [
          {
            required: true,
            message: "Este campo es requerido",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async nextPage() {
      this.$refs["parentForm"].validate(async valid => {
        if (valid) {
          try {
            localStorage.setItem("data", JSON.stringify(this.parentForm));
            this.$router.push("/address");
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
