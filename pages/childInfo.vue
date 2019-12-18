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
              <Radio>Femenino</Radio>
              <Radio>Masculino</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <!-- <FormItem prop="children" label="Cuántos niños registrarás?">
      <Select placeholder="Selecciona"
        ><Option>1</Option> <Option>2</Option></Select
      ></FormItem
    > -->
      <Button @click="nextPage">Avanzar</Button>
    </Form>
  </section>
</template>
<script>
import "~/assets/css/style.css";
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
      } else if (
        this.customerForm.identityDocumentType === "DNI" &&
        (value.length !== 8 || isNaN(value))
      ) {
        callback(new Error("El número de documento debe ser de 8 números"));
      } else if (!reg.test(value)) {
        callback(new Error("Formato inválido"));
      } else {
        callback();
      }
    };
    return {
      childForm: {
        name: "",
        surname: "",
        dni: "",
        email: "",
        phone: "",
        gender: "",
        proms: ""
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
        email: [
          {
            required: true,
            message: "El correo electrónico es requerido",
            trigger: "blur"
          },
          { type: "email", message: "Formato inválido", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "La clave es requerida",
            trigger: "blur"
          },
          {
            min: 6,
            message: "Ingrese al menos 6 caracteres",
            trigger: "blur"
          }
        ],
        children: [
          {
            required: true,
            message: "La cantidad de niños es requerido",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, validator: validatePhoneNumber, trigger: "change" }
        ],
        dni: [
          {
            required: true,
            validator: validateidentityDocumentNumber,
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // validForm() {
    //   return this.$refs["childForm"].validate(async valid => {
    //     debugger;
    //     if (valid) {
    //       return true;
    //     }
    //     return false;
    //   });
    // },
    async nextPage() {
      this.$refs["childForm"].validate(async valid => {
        if (valid) {
          this.$router.push("/listChilds");
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
