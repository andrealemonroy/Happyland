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
    <List>
      <ListItem v-for="child in childs" :key="child._id"
        >{{ child._id }}
        <template slot="action">
          <li>
            <Button @click="deleteChild">Eliminar</Button>
          </li>
        </template>
      </ListItem>
    </List>
    <Button @click="registerChild">AGREGAR UN NIÑO/A</Button>
    <Button @click="nextPage">AVANZAR</Button>
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
    async deleteChild() {
      const resDelete = await Api.deleteChild(this.child._id);
      console.log("idCHildDelete" + resDelete);
    },
    async nextPage() {
      try {
        const idParent = JSON.parse(localStorage.getItem("data"))._id;
        console.log("id Parent" + idParent);
        const dataParent = await Api.getFatherById(idParent).data;
        this.childs = dataParent.childs;
        console.log("hijos: " + this.childs);
        this.$router.push("/contract");
      } catch (error) {
        console.log(error);
        this.$Notice.error({
          title: "Hubo un error, por favor contacte a Soporte"
        });
      }
    }
  }
};
</script>
