const baseSize = 32;

function setRem() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    const scale = document.documentElement.clientWidth / 375;
    document.documentElement.style.fontSize =
      baseSize * Math.min(scale, 2) + "px";
  } else {
    // const scale = document.documentElement.clientWidth / 1920
    document.documentElement.style.fontSize = baseSize / 1.2 + "px";
  }
}

setRem();

window.onresize = function () {
  setRem();
};
