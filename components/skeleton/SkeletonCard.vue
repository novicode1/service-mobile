<template>
  <div class="SkeletonCard">
    <svg
      width="152px"
      height="140px"
      viewBox="0 0 152 140"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="image"
    >
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Artboard" transform="translate(-391.000000, -490.000000)" fill="#404040">
          <g id="Group" transform="translate(391.000000, 490.000000)">
            <circle id="Oval" cx="31.5" cy="23.5" r="23.5"></circle>
            <path
              d="M35.8066826,74.3692069 C20.4098307,71.1679302 -2.85645927,111.347914 0.288570334,126.240647 C3.43359994,141.13338 42.069536,139.33369 76.8622786,139.666845 C111.655021,140 131.253832,139.019631 143.532041,135.391603 C151.37195,133.075027 153.140286,125.577534 151.37195,115.349855 C146.266393,85.8204001 125.281654,35 113.721681,35 C98.1578509,35 90.5651665,92.1638012 76.8622786,98.0946206 C63.1593906,104.02544 51.2035346,77.5704836 35.8066826,74.3692069 Z"
              id="Path-2"
            ></path>
          </g>
        </g>
      </g>
    </svg>
    <div class="name"></div>
    <div class="price"></div>
  </div>
</template>

<script>
export default {
  name: "SkeletonCard",
  computed: {
    computedWidth() {
      return (
        this.width ||
        `${Math.floor(
          Math.random() * (this.maxWidth - this.minWidth) + this.minWidth
        )}%`
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.SkeletonCard {
  display: inline-block;
  // position: relative;
  overflow: hidden;
  vertical-align: middle;
  background-color: #333;
  flex-basis: 22%;
  border-radius: 10px;
  margin: 0 1% 60px;
  height: 360px;
  position: relative;
  padding: 40px 16px 0;
}

.image {
  display: block;
  margin: 0 auto;
  margin-bottom: 32px;
}

.name {
  width: 100%;
  height: 16px;
  background-color: #494949;
  border-radius: 10px;
  margin: 0 auto 20px;
}

.price {
  width: 30%;
  height: 16px;
  background-color: #494949;
  border-radius: 10px;
}

.SkeletonCard::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(#494949, 0) 0,
    rgba(#494949, 0.2) 20%,
    rgba(#494949, 0.5) 60%,
    rgba(#494949, 0)
  );
  animation: shimmer 5s infinite;
  content: "";
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
