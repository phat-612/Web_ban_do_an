$(document).ready(function () {
  // Xử lý kiểm tra đăng nhập khi submit form "Thêm vào giỏ hàng"
  $("#modalFormAddToCart").on("submit", function (e) {
    const isLogin = $(".btnShowModal").attr("data-bs-isLogin");

    if (isLogin !== "true") {
      e.preventDefault();
      $(".divModalFormAddToCart").hide(); // Ẩn modal chi tiết sản phẩm nếu chưa đăng nhập

      const loginModalElement = document.getElementById("ModalDangNhap");
      if (loginModalElement) {
        const loginModal = new bootstrap.Modal(loginModalElement);
        loginModal.show();

        // Xóa lớp backdrop và lớp khóa cuộn khi modal đăng nhập đóng
        loginModalElement.addEventListener("hidden.bs.modal", function () {
          document.body.classList.remove("modal-open");
          $(".modal-backdrop").remove();
          $("body").css({
            overflow: "auto",
            "padding-right": "0px",
          });
        });
      } else {
        console.error("Không thấy modal đăng nhập");
      }
    }
  });

  // Thiết lập lại các giá trị khi đóng modal chi tiết sản phẩm
  $(".modal-btnCloseModal").on("click", function () {
    $(".quantity-Product").val(1);
    $(".quantity-Addmore").val(0);
  });

  // Xử lý hiển thị modal chi tiết sản phẩm và load dữ liệu từ nút "Thêm vào giỏ hàng"
  $(".btnShowModal").on("click", function (e) {
    const btn = e.target;
    $(".modal-productId").val(btn.getAttribute("data-bs-productId"));
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

    if (itemAddMore.length === 0 || itemAddMore === null) {
      eleAreaAddMore.hide();
    } else {
      eleAreaAddMore.show();
      itemAddMore.forEach((item) => {
        eleAreaAddMoreItem.append(
          `<div class="row d-flex justify-content-around align-items-center mb-3">
            <input type="hidden" name="productId" value="${item.id}">
            <div class="col-2">
              <img src="/imgs/products/${item.image}" alt="" width="100" />
            </div>
            <div class="col-4">
              <p class="h6">${item.name}</p>
            </div>
            <div class="col-2">
              <div class="input-group mb-3">
                <button class="btn btn-outline-secondary button-minus-Addmore" type="button">
                  <i class="bi bi-dash"></i>
                </button>
                <input name="productQuantity" style="text-align: center;" type="number" class="form-control quantity-Addmore" aria-label="Example text with button addon" aria-describedby="button-addon1" min="0" max="100" value="0" />
                <button class="btn btn-outline-secondary button-plus-Addmore" type="button">
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

  // Sự kiện điều chỉnh số lượng món ăn kèm và sản phẩm chính
  $(
    ".button-minus-Product, .button-plus-Product, .button-minus-Addmore, .button-plus-Addmore"
  ).on("click", function () {
    const input = $(this).siblings("input");
    let inputValue = parseInt(input.val());
    if ($(this).hasClass("button-minus-Product") && inputValue > 1) {
      input.val(--inputValue);
    } else if ($(this).hasClass("button-plus-Product") && inputValue < 100) {
      input.val(++inputValue);
    } else if ($(this).hasClass("button-minus-Addmore") && inputValue > 0) {
      input.val(--inputValue);
    } else if ($(this).hasClass("button-plus-Addmore") && inputValue < 100) {
      input.val(++inputValue);
    }
  });

  // Xử lý thay đổi giá trị trực tiếp trong ô số lượng
  $(".quantity-Product, .quantity-Addmore").on("change", function () {
    let inputValue = parseInt($(this).val());
    if (isNaN(inputValue)) {
      $(this).val($(this).hasClass("quantity-Product") ? 1 : 0);
    }
  });
});
