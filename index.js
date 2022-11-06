// VARIABLES

const fileInput = document.querySelector("#imageInput");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const brightnessInput = document.querySelector("#brightness");
const saturationInput = document.querySelector("#saturation");
const blurInput = document.querySelector("#blur");
const inversionInput = document.querySelector("#inversion");
const settings = {};
let currentImage = null;

// FUNCTIONS

function resetSettings() {
  settings.brightness = "100";
  settings.saturation = "100";
  settings.blur = "0";
  settings.inversion = "0";

  brightnessInput.value = settings.brightness;
  saturationInput.value = settings.saturation;
  blurInput.value = settings.blur;
  inversionInput.value = settings.inversion;
}

function updateSettings(key, value) {
  if (!currentImage) return;
  settings[key] = value;
  renderImage();
}

function generateFilter() {
  const { brightness, saturation, blur, inversion } = settings;
  return `brightness(${brightness}%) saturate(${saturation}) blur(${blur}px) invert(${inversion}%)`;
}

function renderImage() {
  canvas.width = currentImage.width;
  canvas.height = currentImage.height;
  ctx.filter = generateFilter();
  ctx.drawImage(currentImage, 0, 0);
}

resetSettings();

// EVENT LISTENERS

brightnessInput.addEventListener("change", () =>
  updateSettings("brightness", brightnessInput.value)
);

blurInput.addEventListener("change", () =>
  updateSettings("blur", blurInput.value)
);

inversionInput.addEventListener("change", () =>
  updateSettings("inversion", inversionInput.value)
);

saturationInput.addEventListener("change", () =>
  updateSettings("saturation", saturationInput.value)
);

fileInput.addEventListener("change", () => {
  currentImage = new Image();

  currentImage.addEventListener("load", () => {
    resetSettings();
    renderImage();
  });

  currentImage.src = URL.createObjectURL(fileInput.files[0]);
});
