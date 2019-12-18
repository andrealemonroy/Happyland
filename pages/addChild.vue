<template>
  <section class="center top-60">
    <h1>¿LE GUSTARÍA AGREGAR UN NIÑO?</h1>
    <Button @click="childInfo">Sí</Button>
    <Button @click="listChilds">No</Button>
  </section>
</template>
<script>
export default {
  methods: {
    childInfo() {
      this.$router.push("/childInfo");
    },
    listChilds() {
      this.$router.push("/listChilds");
    }
  }
};
</script>
