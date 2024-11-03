var minusAddmoreBtn = Document.querySelector("#button-minus-Addmore");
var plusAddmoreBtn = Document.querySelector("#button-plus-Addmore");

$("#button-minus-Addmore").on("click", function (e) {
  const btn = e.target;
  const inputGroup = $(btn.closest(".input-group"));
  const inpValue = btn.getAtrribute("quantity-Addmore");
});

function sendFetchUpdateQuantityAddmore() {
  fetch("", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  }).then((response) => {});
}
