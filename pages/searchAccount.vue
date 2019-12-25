<template>
  <section class="center">
    <Row style="margin: 10px" type="flex" justify="start">
      <Button type="reset" @click="goBack">
          <Icon type="ios-arrow-back" />Regresar
      </Button>
    </Row>
    <Row type="flex" justify="space-around" style="margin-top: 40px">
      <Col :lg="10">
        <Form
          ref="searchForm"
          :model="searchForm"
          :rules="validateForm"
          class="top-60"
          label-position="top"
        >
          <FormItem prop="email" class="top-60" label="Digita tu correo electrónico">
            <Input
              v-model="searchForm.email"
              search enter-button="Buscar"
              placeholder="Digita tu correo electrónico"
            ></Input>
          </FormItem>
          <!-- <FormItem prop="id" class="top-60" label="Correo electrónico">
            <Input
              v-model="searchForm.id"
              search
              placeholder="Coloque su correo"
            ></Input>
          </FormItem> -->
        </Form>
      </Col>
    </Row>
      <div v-if="foundIt" class="col-full">
        <Form
          class="form"
          ref="parentForm"
          role="form"
          :model="parentForm"
          :rules="validateParentForm"
          @submit.native.prevent="save"
          label-position="top"
        >
                <Row type="flex" justify="space-around">
                    <Col :lg="10">
              <FormItem prop="names" label="Nombres">
                <Input v-model="parentForm.names" placeholder="Nombres"></Input>
              </FormItem>
              </Col>
              <Col :lg="10">
              <FormItem prop="surname" label="Apellidos">
                <Input
                  v-model="parentForm.surname"
                  placeholder="Apellidos"
                ></Input>
              </FormItem>
              </Col>
              </Row>
              <Row type="flex" justify="space-around">
                <Col :xs="24" :sm="24" :md="12" :lg="10">
                <FormItem prop="birthday" label="Fecha de nacimiento">
                  <DatePicker
                    type="date"
                    format="yyyy-MM-dd"
                    :confirm="false"
                    placeholder="Fecha de nacimiento"
                    v-model="parentForm.birthday"
                  ></DatePicker>
                </FormItem>
              </Col>
                            <Col span="7">
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

              </Row>

            </Col>
            <Row type="flex" justify="space-around">
                <Col :lg="10">
                <FormItem prop="identityDocumentNumber" label="DNI (documento de identidad)">
                    <Input
                      element-id="idn"
                      v-model="parentForm.identityDocumentNumber"
                    ></Input>
                  </FormItem>
                </Col>
                <Col :lg="10">
                  <FormItem prop="phoneNumber" label="Número telefónico">
                    <Input
                      type="tel"
                      placeholder="Número telefónico"
                      v-model="parentForm.phoneNumber"
                    ></Input>
                  </FormItem>
                </Col>
            </Row>
            <Row type="flex" justify="space-around">
            <Col :lg="10">
              <FormItem prop="district" label="Distrito">
                <Select v-model="parentForm.district" placeholder="Distrito">
                    <Option value="LIMA">LIMA</Option>
                    <Option value="ANCON">ANCON</Option>
                    <Option value="ATE">ATE</Option>
                    <Option value="BARRANCO">BARRANCO</Option>
                    <Option value="BREÑA">BREÑA</Option>
                    <Option value="CARABAYLLO">CARABAYLLO</Option>
                    <Option value="CHACLACAYO">CHACLACAYO</Option>
                    <Option value="CHORRILLOS">CHORRILLOS</Option>
                    <Option value="CIENEGUILLA">CIENEGUILLA</Option>
                    <Option value="COMAS">COMAS</Option>
                    <Option value="EL AGUSTINO">EL AGUSTINO</Option>
                    <Option value="INDEPENDENCIA">INDEPENDENCIA</Option>
                    <Option value="JESUS MARIA">JESUS MARIA</Option>
                    <Option value="LA MOLINA">LA MOLINA</Option>
                    <Option value="LA VICTORIA">LA VICTORIA</Option>
                    <Option value="LINCE">LINCE</Option>
                    <Option value="LOS OLIVOS">LOS OLIVOS</Option>
                    <Option value="LURIGANCHO">LURIGANCHO</Option>
                    <Option value="LURIN">LURIN</Option>
                    <Option value="MAGDALENA DEL MAR">MAGDALENA DEL MAR</Option>
                    <Option value="MIRAFLORES">MIRAFLORES</Option>
                    <Option value="PACHACAMAC">PACHACAMAC</Option>
                    <Option value="PUCUSANA">PUCUSANA</Option>
                    <Option value="PUEBLO LIBRE">PUEBLO LIBRE</Option>
                    <Option value="PUENTE PIEDRA">PUENTE PIEDRA</Option>
                    <Option value="PUNTA HERMOSA">PUNTA HERMOSA</Option>
                    <Option value="PUNTA NEGRA">PUNTA NEGRA</Option>
                    <Option value="RIMAC">RIMAC</Option>
                    <Option value="SAN BARTOLO">SAN BARTOLO</Option>
                    <Option value="SAN BORJA">SAN BORJA</Option>
                    <Option value="SAN ISIDRO">SAN ISIDRO</Option>
                    <Option value="SAN JUAN DE LURIGANCHO">SAN JUAN DE LURIGANCHO</Option>
                    <Option value="SAN JUAN DE MIRAFLORES">SAN JUAN DE MIRAFLORES</Option>
                    <Option value="SAN LUIS">SAN LUIS</Option>
                    <Option value="SAN MARTIN DE PORRES">SAN MARTIN DE PORRES</Option>
                    <Option value="SAN MIGUEL">SAN MIGUEL</Option>
                    <Option value="SANTA ANITA">SANTA ANITA</Option>
                    <Option value="SANTA MARIA DEL MAR">SANTA MARIA DEL MAR</Option>
                    <Option value="SANTA ROSA">SANTA ROSA</Option>
                    <Option value="SANTIAGO DE SURCO">SANTIAGO DE SURCO</Option>
                    <Option value="SURQUILLO">SURQUILLO</Option>
                    <Option value="VILLA EL SALVADOR">VILLA EL SALVADOR</Option>
                    <Option value="VILLA MARIA DEL TRIUNFO">VILLA MARIA DEL TRIUNFO</Option>
                </Select>
              </FormItem>
            </Col>
            <Col :lg="10">
              <FormItem prop="line" label="Dirección">
                <Input
                  v-model="parentForm.line"
                  placeholder="Dirección"
                ></Input>
              </FormItem>
            </Col>
            </Row>
              <!-- <Col class="jumio" :xs="24" :sm="6" :md="12" :lg="12">
              <h3 v-if="this.$store.state.customer.verifiedIdentity">
                Validación de Identidad
              </h3>
              <a
                v-if="
                  jumioTextValidation === 'Pendiente' &&
                    this.$store.state.customer.verifiedIdentity
                "
                style="color:#ffa13c; display:flex; font-size: 16px;"
              >
                {{ jumioTextValidation }}
                <img
                  style="height: 15px; margin: auto 3px"
                  src="../assets/icons/pendiente-jumio.png"
                />
              </a>

              <a
                v-if="
                  jumioTextValidation === 'Rechazado' &&
                    this.$store.state.customer.verifiedIdentity
                "
                style="color:#E30000; display:flex; font-size: 16px"
              >
                {{ jumioTextValidation }}
                <i
                  style="color:#E30000; margin: auto 3px"
                  class="fa fa-times-circle"
                  aria-hidden="true"
                ></i>
              </a>

              <a
                v-if="
                  jumioTextValidation === 'Aprobado' &&
                    this.$store.state.customer.verifiedIdentity
                "
                style="color:#00e3c2; display:flex; font-size: 16px;"
              >
                {{ jumioTextValidation }}
                <img
                  style="height: 15px; margin: auto 3px"
                  src="../assets/icons/aceptado-jumio.png"
                />
              </a>
              <button
                type="reset"
                class="retry"
                v-if="
                  jumioTextValidation === 'Iniciar Validación' &&
                    this.$store.state.customer.verifiedIdentity
                "
                style="font-size: 13px;font-weight: bold;"
                @click="handleSubmit"
              >
                <Icon type="ios-camera-outline" />
                {{ jumioTextValidation }}
              </button>
            </Col> -->
            </Col>


          <Row type="flex" justify="end">
            <Col :lg="5">
              <Button @click="updateParent">
                Actualizar
              </Button>
            </Col>
          </Row>
        </Form>


      </div>
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
    const searchAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("El email es requerido"));
      } else {
        Api.getFatherByEmail(this.searchForm.email)
          .then(res => {
            this.foundIt = true;
            // const { data } = res.data;
            console.log(res);
            this.parentForm.names = res.data.names;
            this.parentForm.surname = res.data.surname;
            this.parentForm.identityDocumentNumber =
              res.data.identityDocumentNumber;
              this.parentForm.phoneNumber = res.data.phoneNumber;
            this.parentForm.birthday = res.data.birthday;
            this.parentForm.specialOffer = res.data.specialOffer;
            // this.parentForm.email = data.email;
            this.parentForm.gender = res.data.gender;
            this.parentForm.line = res.data.line;
            this.parentForm.district = (res.data.district).toUpperCase();
            // this.found = true
            callback();
          })
          .catch(error => {
            this.found = false;
            if (error) {
              callback(new Error(error));
            } else {
              callback();
            }
          })
          .finally(() => {
            // this.btnDisabled = false
          });
      }
    };

    return {
      foundIt: false,
      searchForm: {
        email: "",
        // id: ""
      },
      parentForm: {
        names: "",
        surname: "",
        identityDocumentNumber: "",
        email: "",
        phoneNumber: "",
        gender: "",
        line: "",
        district: "",
        specialOffer: ""
      },
      parent: {},
      validateForm: {
        email: [
            { type: "email", message: "Formato inválido", trigger: "blur" },
          { validator: searchAccount, trigger: "blur" }
        ]
      },
      validateParentForm: {
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
      updateParent(){
        this.$refs["parentForm"].validate(async valid => {
        if (valid) {
            const idParent = localStorage.getItem("parentId");
            console.log(idParent )
            console.log(this.parentForm)
            this.parentForm.email = this.searchForm.email
             Api.updateParent(idParent, this.parentForm).then( res => {
               console.log(res)
             }).catch(error => {
               console.log(error)
             })

        } else {
          this.$Notice.error({
            title: "Hay campos inválidos en el formulario"
          });
        }
      });
      },
      goBack() {
      this.$router.push("/");
    }
    // async searchForm() {
    //   this.$refs["parentForm"].validate(async valid => {
    //     if (valid) {
    //       try {
    //         localStorage.setItem("data", JSON.stringify(this.parentForm));
    //         this.$router.push("/address");
    //       } catch (error) {
    //         this.$Notice.error({
    //           title: "No se pudo completar el registro"
    //         });
    //       }
    //     } else {
    //       this.$Notice.error({
    //         title: "Hay campos inválidos en el formulario"
    //       });
    //     }
    //   });
    // }
  }
};
</script>