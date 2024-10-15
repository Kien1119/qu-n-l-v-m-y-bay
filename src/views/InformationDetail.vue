<template>
  <div>
    <div>
      <Tabs value="0">
        <TabList>
          <Tab value="0">Chi tiết vé</Tab>
          <Tab value="1">Vé rút gọn</Tab>
          <Tab value="2">Điều kiện vé</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <TicketDetails></TicketDetails>
          </TabPanel>
          <TabPanel value="1">
            <p class="m-0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
              sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
              voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
              modi.
            </p>
          </TabPanel>
          <TabPanel value="2">
            <p class="m-0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
              voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
              occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
              mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
              expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque
              nihil impedit quo minus.
            </p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>
<script setup>
import TicketDetails from '@/component/TicketDetails.vue'
</script>
<style scoped></style>
