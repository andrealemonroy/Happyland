<template>
  <section class="font-20 center top-60">
    <Row><Col span="24">PDF</Col></Row>
    <Row type="flex" justify="end">
      <Button @click="nextPage">Click aquí para firmar</Button>
    </Row>
  </section>
</template>
<script>
// import jsPDF from "jsPDF";
export default {
  methods: {
    nextPage() {
      this.$router.push("/signature");
    }
  }
};
</script>
