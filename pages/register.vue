<template>
  <section class="center top-60 font-20">
    <h1>INGRESE SU INFORMACIÓN AL REGISTRO</h1>
    <Form ref="parentForm" :model="parentForm" :rules="validateForm" class="top-60">
      <Row type="flex" justify="space-around">
        <Col span="7">
          <FormItem prop="name" label="Nombre"
            ><Input v-model="parentForm.name" placeholder="ej. Andrea"></Input
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
          <FormItem prop="dni" label="DNI"
            ><Input v-model="parentForm.dni" placeholder="ej. 12345678"></Input
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
          <FormItem prop="phone" label="Celular"
            ><Input v-model="parentForm.phone" placeholder="987654321"></Input
          ></FormItem>
        </Col>
        <Col span="7">
          <FormItem prop="gender" label="Género">
            <RadioGroup v-model="parentForm.gender">
              <Radio>Femenino</Radio>
              <Radio>Masculino</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-around">
        <Col span="11">
          <FormItem
            prop="viaProm"
            label="Me gustaría recibir ofertas especiales a través de:"
          >
            <RadioGroup v-model="parentForm.proms">
              <Radio>Email</Radio>
              <Radio>Mensaje de texto</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="11"> </Col>
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
      parentForm: {
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
    //   return this.$refs["parentForm"].validate(async valid => {
    //     debugger;
    //     if (valid) {
    //       return true;
    //     }
    //     return false;
    //   });
    // },
    async nextPage() {
      this.$refs["parentForm"].validate(async valid => {
        if (valid) {
          debugger;
          this.$router.push("/address");
        } else {
          debugger;
          this.$Notice.error({
            title: "Hay campos inválidos en el formulario"
          });
        }
      });
    }
  }
};
</script>
