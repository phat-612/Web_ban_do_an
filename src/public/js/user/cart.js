$(document).ready(function () {
  // xử lý khi website load
  loadTotal();
  setAddress();
  // show address
  const setAddress = () => {
    const eleAddressChecked = $('input[name="address"]:checked');
    $(".showAddress").text(eleAddressChecked.val());

    $('input[name="nameDelivery"]').val(eleAddressChecked.attr("data-bs-name"));
    $('input[name="phoneDelivery"]').val(
      eleAddressChecked.attr("data-bs-phone")
    );
    $('input[name="addressDelivery"]').val(
      eleAddressChecked.attr("data-bs-address")
    );
  };

  $('input[name="address"]').on("change", () => {
    setAddress();
  });
  // xử lý số lượng sản phẩm trong giỏ hàng
  $(".minusQuantity").on("click", function (e) {
    const input = $(this).closest(".controlQuantity").find(".inpQuantity");
    let inputvalue = parseInt(input.val());

    if (inputvalue > 1) {
      inputvalue--;
      input.val(inputvalue);
    }
    input.trigger("change");
  });
  $(".addQuantity").on("click", function (e) {
    const input = $(this).closest(".controlQuantity").find(".inpQuantity");
    let inputvalue = parseInt(input.val());
    inputvalue++;
    input.val(inputvalue);
    input.trigger("change");
  });
  $(".inpQuantity").on("change", function () {
    let inputvalue = parseInt($(this).val());
    if (isNaN(inputvalue)) {
      $(this).val(1);
    }
    updateQuantity($(this).attr("data-bs-idProduct"), inputvalue);
  });
  //   xóa sản phẩm trong giỏ hàng
  $(".deleteProduct").on("click", function (e) {
    const idProduct = $(this).attr("data-bs-idProduct");
    updateQuantity(idProduct, 0);
  });
  //   hàm update số lượng lên server và total
  const updateQuantity = (idProduct, quantity) => {
    console.log(idProduct, quantity);
    loadTotal();
    // fetch data lên server
    $.ajax({
      url: "/api/updateQuantityCart",
      type: "POST",
      data: { idProduct, quantity },
      dataType: "json",
      success: function (response) {
        console.log("thành công");
      },
      error: function (xhr, status, error) {
        console.log("lỗi");
      },
    });
  };
  //   load data total
  const loadTotal = () => {
    const areaSubTotal = $(".areaSubTotal");
    const areaProduct = $(".areaProduct");
    const listEleProduct = areaProduct.find("div");
    let dataProduct = [];
    listEleProduct.each((ind, ele) => {
      const name = $(ele).find(".nameProduct").text();
      const price = $(ele).find(".priceProduct").attr("data-bs-priceProduct");
      const quantity = $(ele).find(".inpQuantity").val();
      const total = price * quantity;
      dataProduct.push({
        name,
        price,
        quantity,
        total,
      });
    });
    let htmlSubTotal = "";
    dataProduct.forEach((product) => {
      htmlSubTotal += `
        <div class="d-flex justify-content-between">
            <span>${product.name}</span>
            <span>${product.price}</span>
            <span>${product.quantity}</span>
            <span>${product.total}</span>
        </div>
        `;
    });
    areaSubTotal.html(htmlSubTotal);
    $(".total").text(dataProduct.reduce((acc, cur) => acc + cur.total, 0));
  };
});
