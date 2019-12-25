<template>
  <section class="center top-60 font-20 scroll">
    <h1>INGRESA LA INFORMACION DEL NIÑO</h1>
    <Form
      ref="childForm"
      :model="childForm"
      :rules="validateForm"
      class="top-60"
      label-position="top"
    >
      <Row type="flex" justify="space-around">
        <Col span="7">
          <FormItem prop="names" label="Nombre"
            ><Input v-model="childForm.names" placeholder="ej. Andrea"></Input
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
          <FormItem prop="identityDocumentNumber" label="DNI del niño"
            ><Input
              v-model="childForm.identityDocumentNumber"
              placeholder="ej. 12345678"
            ></Input
          ></FormItem>
        </Col>
      </Row>
      <Row type="flex" justify="space-around">
        <Col span="7">
          <FormItem prop="relative" label="Parentesco">
            <Select placeholder="Seleccione" v-model="childForm.relative">
              <Option value="Hijo(a)">Hijo(a)</Option>
              <Option value="Hermano(a)">Hermano(a)</Option>
              <Option value="Primo(a)">Primo(a)</Option>
              <Option value="Sobrino(a)">Sobrino(a)</Option>
              <Option value="Nieto(a)">Nieto(a)</Option>
              <Option value="Otro">Otro</Option>
            </Select>
          </FormItem>
          <FormItem v-if="otherRelative" prop="relative" label="Parentesco">
            <Input
              placeholder="Ingrese parentesco"
              v-model="otherRelativeModel"
            />
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem prop="gender" label="Género">
            <RadioGroup v-model="childForm.gender">
              <Radio label="female">Femenino</Radio>
              <Radio label="male">Masculino</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="7"> </Col>
      </Row>
      <Button @click="nextPage">Siguiente</Button>
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
        names: "",
        surname: "",
        identityDocumentNumber: "",
        gender: ""
      },
      otherRelative: false,
      otherRelativeModel: "",
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
        identityDocumentNumber: [
          {
            required: true,
            validator: validateidentityDocumentNumber,
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "El género es requerido", trigger: "blur" }
        ],
        relative: [
          {
            required: true,
            message: "El parentesco es requerido",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async nextPage() {
      this.$refs["childForm"].validate(async valid => {
        if (valid) {
          if (this.childForm.relative == "Otro") {
            this.otherRelative = true;
            delete this.childForm.relative;
            if (this.otherRelativeModel != "") {
              this.childForm.relative = this.otherRelativeModel;
            } else {
              this.$Notice.error({
                title: "Error en el registro",
                desc: "Debe completar el parentesco"
              });
            }
          }
          Api.registerChild(this.childForm)
            .then(res => {
              if (res.status === 200) {
                const idParent = localStorage.getItem("parentId");
                Api.registerChildToParent(res.data, idParent).then(res => {
                  console.log("guardado con éxito");
                  this.$router.push("/listChilds");
                });
              } else {
                this.$Notice.error({
                  title: "Error en el registro",
                  desc: "Ya existe el registro del niño"
                });
              }
            })
            .catch(error => {
              this.$Notice.error({
                title: "Error en el registro",
                desc: "Ya existe el registro del niño"
              });
            });
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
