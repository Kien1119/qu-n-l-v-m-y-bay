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
            <ShortenDetailBooking></ShortenDetailBooking>
          </TabPanel>
          <TabPanel value="2">
            <ConditionTicket></ConditionTicket>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>
<script setup>
import ConditionTicket from '@/component/ConditionTicket.vue'
import ShortenDetailBooking from '@/component/ShortenDetailBooking.vue'
import TicketDetails from '@/component/TicketDetails.vue'
</script>
<style scoped></style>
