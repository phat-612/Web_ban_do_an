// process multiple select
document.addEventListener("DOMContentLoaded", function () {
  const multipleSelect = document.getElementById("multiple-select");
  const choices = new Choices(multipleSelect, {
    removeItemButton: true,
  });
});
// process image
document.addEventListener("DOMContentLoaded", function () {
  const inpImage = document.getElementById("inpImage");
  const imagePreview = document.getElementById("preview");
  inpImage.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        imagePreview.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  });
});
