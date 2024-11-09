$(".td-content").on("click", (e) => {
  let content = $(e.target).attr("data-bs-content");
  $(".area-fullcontent").text(content);
});
