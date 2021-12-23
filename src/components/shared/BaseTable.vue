<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left" v-for="header in tableData.headers" :key="header">
          {{ header }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in tableData.dataList"
          :key="item.transactionId"
      >
        <td v-for="i in item" :key="i">{{i}}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Object
    }
  }
}
</script>