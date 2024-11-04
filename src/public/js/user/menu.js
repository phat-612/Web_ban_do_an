// xu ly nut dong' modal thi` refresh cac gia' tri.

$(".modal-btnCloseModal").on("click", function () {
  $(".quantity-Product").val(1);
});

// xu ly' show du lieu ra modal

$(".btnShowModal").on("click", function (e) {
  // refresh so luong san pham

  const btn = e.target;

  $(".modal-productName").text(btn.getAttribute("data-bs-productName"));
  $(".modal-productImage").attr(
    "src",
    `imgs/products/${btn.getAttribute("data-bs-productImage")}`
  );
  $(".modal-productCurrentPrice").text(
    btn.getAttribute("data-bs-productCurrentPrice")
  );
  $(".modal-productDescription").text(
    btn.getAttribute("data-bs-productDescription")
  );
});

// xu ly nut cong tru so luong san pham trong modal

$(".button-minus-Product").on("click", function (e) {
  const input = $(".quantity-Product");
  let inputvalue = parseInt($(".quantity-Product").val());
  if (inputvalue > 1) {
    inputvalue--;
    input.val(inputvalue);
  } else {
    return;
  }
});

$(".button-plus-Product").on("click", function (e) {
  const input = $(".quantity-Product");
  let inputvalue = parseInt($(".quantity-Product").val());
  if (inputvalue < 99) {
    inputvalue++;
    input.val(inputvalue);
  } else {
    return;
  }
});

//
$("#button-plus-Addmore").on("click", function (e) {
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
