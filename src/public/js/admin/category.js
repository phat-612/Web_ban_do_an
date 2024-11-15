$(".editCategoryBtn").on("click", function (e) {
  const btn = e.target;
  $(".tenDanhMucInput").val(btn.getAttribute("data-bs-name"));
  $(".idDanhMucInput").val(btn.getAttribute("data-bs-id"));
});
