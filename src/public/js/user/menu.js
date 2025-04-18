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
          `<div class="row d-flex justify-content-around align-items-center mb-3 position-relative">
          <div
          class="tag position-absolute top-0 start-0 bg-danger rounded-pill px-2 text-white"
          style="z-index: 10; width: 115px;${
            item.isBussiness || item.isExit ? "display:none" : ""
          }"
        >
          Không có sẵn
        </div>
            <input type="hidden" name="productId" value="${item.id}">
            <div class="col-2">
              <img src="/imgs/products/${item.image}" alt="" width="100" />
            </div>
            <div class="col-4">
              <p class="h6">${item.name}</p>
            </div>
            <div class="col-2">
              <div class="input-group mb-3">
                <button class="btn btn-outline-secondary button-minus-Addmore" ${
                  !item.isBussiness || !item.isExit ? "disabled" : ""
                } type="button">
                  <i class="bi bi-dash"></i>
                </button>
                <input name="productQuantity" style="text-align: center;" type="number" ${
                  !item.isBussiness || !item.isExit ? "disabled" : ""
                } class="form-control quantity-Addmore" aria-label="Example text with button addon" aria-describedby="button-addon1" min="0" max="100" value="0" />
                <button class="btn btn-outline-secondary button-plus-Addmore" ${
                  !item.isBussiness || !item.isExit ? "disabled" : ""
                } type="button">
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
    // xu ly nut cong tru so luong cua mon an kem
    $(".button-minus-Addmore").on("click", function () {
      const inputAddmore = $(this)
        .closest(".input-group")
        .find(".quantity-Addmore");
      let inputAddmoreValue = parseInt(inputAddmore.val());
      if (inputAddmoreValue > 0) {
        inputAddmoreValue--;
        inputAddmore.val(inputAddmoreValue);
      }
    });
    $(".button-plus-Addmore").on("click", function () {
      const inputAddmore = $(this)
        .closest(".input-group")
        .find(".quantity-Addmore");
      let inputAddmoreValue = parseInt(inputAddmore.val());
      if (inputAddmoreValue < 100) {
        inputAddmoreValue++;
        inputAddmore.val(inputAddmoreValue);
      }
    });
    $(".quantity-Addmore").on("change", function () {
      let inputAddmoreValue = parseInt($(this).val());
      if (isNaN(inputAddmoreValue)) {
        $(this).val(0); // Đặt lại giá trị về 0 nếu không phải là số
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

  // Sự kiện điều chỉnh số lượng sản phẩm chính
  $(".button-minus-Product, .button-plus-Product").on("click", function () {
    const input = $(this).siblings("input");
    let inputValue = parseInt(input.val());
    if ($(this).hasClass("button-minus-Product") && inputValue > 1) {
      input.val(--inputValue);
    } else if ($(this).hasClass("button-plus-Product") && inputValue < 100) {
      input.val(++inputValue);
    }
  });
});
