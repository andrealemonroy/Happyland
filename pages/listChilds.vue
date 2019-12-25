<template>
  <section class="center top-60 font-20">
    <h1>REVISION DE NIÑOS BAJO TUTELA</h1>
    <br />
    <p>
      A continuación se muestra la lista de niños registrados. Toque el botón
      Guardar en la parte superior derecha para continuar, o agregue niños
      adicionales
    </p>
    <br />
    <br />
    <Row type="flex" justify="center">
      <Col :lg="{ span: 8 }"> </Col>
      <Col :lg="{ span: 12 }">
        <List class="list" style="margin: auto">
          <ListItem v-for="child in childs" :key="child.child"
            >{{ child.names }}  {{ child.surname }} - {{ child.relative }}  
            <template slot="action">
              <li>
                <button class="delete" @click="deleteChild(child.child)">
                  Eliminar
                </button>
              </li>
            </template>
          </ListItem>
        </List>
      </Col>
      <Col :lg="{ span: 2 }"> </Col>
    </Row>
    <br />
    <br />

    <Row type="flex" justify="space-between">
      <Col span="6">
        <Button @click="registerChild">Agregar a un niño</Button>
      </Col>
      <Col span="6"> <Button @click="nextPage">Continuar</Button> </Col>
    </Row>
  </section>
</template>
<script>
import "~/assets/css/style.css";
import * as Api from "@/server/index";
import localStorage from "localStorage";
export default {
  data() {
    return {
      childs: []
    };
  },
  methods: {
    registerChild() {
      this.$router.push("/childInfo");
    },
    async deleteChild(child) {
      Api.deleteChild(child)
        .then(res => {
          console.log(res);
          this.getChilds();
        })
        .catch(error => {});
    },
    async nextPage() {
      this.$router.push("/contract");
    },
    async getChilds() {
      const idParent = localStorage.getItem("parentId");
      this.childs = (await Api.getFatherById(idParent)).data.childs;
      console.log(this.childs);
    }
  },
  async created() {
    return await this.getChilds();
  }
  // beforeCreate() {
  //   this.childs = this.getChilds();
  // Api.getFatherById(idParent)
  //   .then(res => {
  //     console.log(res);
  //     this.childs = res.data.childs;
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }
};
</script>
<style scoped>
.list {
  text-align: center;
  margin: auto;
}
.delete {
  padding: 10% 20%;
  background-color: #ed4014 !important;
  color: black;
  border-radius: 30px;
  font-family: "Montserrat-light";
}
</style>
