<template>
  <view class="_uni-popup-cancel-dialog-internal">
    <uni-popup-dialog
      type="info"
      :before-close="true"
      cancelText="取消"
      confirmText=""
      :title="title"
      @close="close"
    >
      <slot></slot>
    </uni-popup-dialog>
  </view>
</template>

<script>
const closeEmit = "close";
export default {
  props: {
    title: String,
  },
  emits: [closeEmit],
  setup(props, context) {
    function close(e) {
      context.emit(closeEmit, e);
    }
    return { close };
  },
};
</script>

<style lang="scss">
._uni-popup-cancel-dialog-internal::v-deep .uni-popup-dialog .uni-border-left {
  display: none;
}
</style>