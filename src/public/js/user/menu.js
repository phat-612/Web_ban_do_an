// xu ly nut dong' modal thi` refresh cac gia' tri.

$(".modal-btnCloseModal").on("click", function () {
  $(".quantity-Product").val(1);
});

// xu ly input so luong san pham trong modal neu bi xoa so ttrong input

$(".quantity-Product").on("change", function () {
  const input = $(".quantity-Product");
  let inputvalue = parseInt($(".quantity-Product").val());
  if (isNaN(inputvalue)) {
    input.val(1);
  }
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
  const itemAddMore = JSON.parse(btn.getAttribute("data-bs-itemAddMore"));
  const eleAreaAddMore = $("#areaAddMore");
  const eleAreaAddMoreItem = $("#areaAddMoreItem");
  eleAreaAddMoreItem.empty();
  console.log(itemAddMore);
  if (itemAddMore.length === 0 || itemAddMore === null) {
    eleAreaAddMore.hide();
  } else {
    eleAreaAddMore.show();
    itemAddMore.forEach((item) => {
      eleAreaAddMoreItem.append(
        `<div class="row d-flex justify-content-around align-items-center mb-3">
          <div class="col-2">
            <img src="/imgs/products/${item.image}" alt="" width="100" />
          </div>
          <div class="col-4">
            <p class="h6">${item.name}</p>
          </div>
          <div class="col-2">
            <div class="input-group mb-3">
              <button class="btn btn-outline-secondary" type="button" id="button-minus-Addmore">
                <i class="bi bi-dash"></i>
              </button>
              <input style="text-align: center;" id="quantity-Addmore" type="number" class="form-control quantity-Addmore" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" min="0" max="100" oninput="validity.valid||(value='');" value="0" />
              <button class="btn btn-outline-secondary" type="button" id="button-plus-Addmore">
                <i class="bi bi-plus"></i>
              </button>
            </div>
          </div>
          <div class="col-2">
            <p class="h6">${item.currentPrice}</p>
          </div>
        </div>`
      );
    });
  }
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

  if (inputvalue < 100) {
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
