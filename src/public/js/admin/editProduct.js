document.addEventListener("DOMContentLoaded", function () {
  const multipleSelect = document.getElementById("multiple-select");
  const choices = new Choices(multipleSelect, {
    removeItemButton: true,
  });
});
