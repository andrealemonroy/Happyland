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
            > 
                <Select v-model="addressForm.district" placeholder="Distrito">
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
                </Select></FormItem
          >
        </Col>
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
            const data = JSON.parse(localStorage.getItem("data"));
            data.line = this.addressForm.address;
            data.district = this.addressForm.district;
            Api.registerParent(data)
              .then(res => {
                console.log(res)
                if (res.status === 200) {
                  localStorage.setItem("parentId", res.data._id);
                  this.$router.push("/addChild");
                } else{
                  this.$Notice.error({
                  title: "Error en el registro",
                  desc: res.response.data.message
                });
                }
              })
          
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
