<template>
  <ul class="sidenav app-sidenav open">
    <li>
      <router-link
        v-for="link in links"
        :key="link.url"
        class="waves-effect waves-orange pointer"
        active-class="active" 
        :to="link.url"
      >
        {{ link.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data: () => ({
    links: [
      { title: "Balance", url: "/" },
      { title: "Log", url: "/history" },
      { title: "Planning", url: "/planning" },
      { title: "New record", url: "/record" },
      { title: "Categories", url: "/categories" },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.active {
  background-color: rgba(0, 0, 0, 0.192);
}
</style>