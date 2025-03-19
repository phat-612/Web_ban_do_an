$(document).ready(function () {
  let debounceTimer;
  let currentIdProduct;
  let currentQuantityProduct;
  let locationUser;
  let priceShip = 0;
  // function
  //  hàm debounce
  function debounce(func, delay) {
    return function (...args) {
      // Xóa bộ đếm thời gian trước đó
      clearTimeout(debounceTimer);
      // Thiết lập bộ đếm thời gian mới
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  }
  //get distance
  function findRoute(start, end) {
    fetch(
      `https://graphhopper.com/api/1/route?vehicle=car&locale=en&key=LijBPDQGfu7Iiq80w3HzwB4RUDJbMbhs6BU0dEnn&elevation=false&instructions=true&turn_costs=true&point=${start[0]}%2C${start[1]}&point=${end[0]}%2C${end[1]}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.paths && data.paths.length > 0) {
          priceShip =
            Math.round(parseInt(data.paths[0].distance * 7) / 1000) * 1000;
          $(
            "#formOrder > div.col-5 > div:nth-child(4) > div.fs-5.areaShiping > div > span:nth-child(2)"
          ).text(priceShip.toLocaleString("vi-VN"));
          loadTotal();
        } else {
          alert("Không tìm thấy đường đi");
        }
      })
      .catch((error) => console.error("Error fetching route:", error));
  }
  const setAddress = () => {
    const eleAddressChecked = $('input[name="address"]:checked');
    if (eleAddressChecked.length == 0) {
      return;
    }
    $(".showAddress").text(eleAddressChecked.val());
    $('input[name="nameDelivery"]').val(eleAddressChecked.attr("data-bs-name"));
    $('input[name="phoneDelivery"]').val(
      eleAddressChecked.attr("data-bs-phone")
    );
    $('input[name="addressDelivery"]').val(
      eleAddressChecked.attr("data-bs-address")
    );
    $('input[name="locationDelivery"]').val(
      eleAddressChecked.attr("data-bs-location")
    );
    if (eleAddressChecked.attr("data-bs-location") != undefined) {
      locationUser = JSON.parse(eleAddressChecked.attr("data-bs-location"));
    }

    findRoute(locationShop, locationUser);
    $("#formOrder > div.col-5 > div:nth-child(4) > div.fs-5.areaShiping").css(
      "display",
      "block"
    );
  };
  //   hàm update số lượng lên server và total
  const updateQuantity = (idProduct, quantity) => {
    loadTotal();
    // fetch data lên server
    $.ajax({
      url: "/api/updateQuantityCart",
      type: "POST",
      data: { idProduct, quantity },
      dataType: "json",
      success: function (response) {
        console.log("thành công cập nhật số lượng");
      },
      error: function (xhr, status, error) {
        console.log("lỗi cập nhật số lượng");
      },
    });
  };
  //   load data total
  const loadTotal = () => {
    const areaSubTotal = $(".areaSubTotal");
    const areaProduct = $(".areaProduct");
    const listEleProduct = areaProduct.children("div");
    let dataProduct = [];
    listEleProduct.each((ind, ele) => {
      const name = $(ele).find(".nameProduct").text();
      const price = $(ele).find(".priceProduct").attr("data-bs-priceProduct");
      const quantity = $(ele).find(".inpQuantity").val();
      const isBuy = $(ele).find(".cbxIsBuy").is(":checked") ? 1 : 0;
      const total = price * quantity;
      dataProduct.push({
        name,
        price,
        quantity,
        total,
        isBuy,
      });
    });
    let htmlSubTotal = "";
    dataProduct.forEach((product) => {
      if (product.isBuy) {
        let formatPrice = product.price.toLocaleString("vi-VN");
        let formatTotal = product.total.toLocaleString("vi-VN");
        htmlSubTotal += `
        <div class="row">
            <span class="col-5 one-row">${product.name}</span>
            <span class="col-2 text-center">${formatPrice}</span>
            <span class="col-1 text-center">${product.quantity}</span>
            <span class="col-4 text-end">${formatTotal}</span>
        </div>
        `;
      }
    });
    areaSubTotal.html(htmlSubTotal);
    // cập nhật số lượng sản phẩm trong giỏ hàng
    $(".totalProduct").text(`(${dataProduct.length} sản phẩm)`);
    // disable btnOrder
    const countProductBuy = dataProduct.filter((item) => item.isBuy).length;
    if (countProductBuy == 0) {
      $(".btnOrder").attr("disabled", true);
      $("#formOrder > div.col-5 > div:nth-child(4) > div.fs-5.areaShiping").css(
        "display",
        "none"
      );
    } else {
      $(".btnOrder").removeAttr("disabled");
    }
    let totalPrice = dataProduct.reduce(
      (acc, cur) => (cur.isBuy ? acc + cur.total : acc),
      0
    );

    if (priceShip > 0 && totalPrice != 0) {
      totalPrice += priceShip;
    }
    $(".total").text(totalPrice.toLocaleString("vi-VN"));
  };
  // xử lý khi website load
  loadTotal();
  setAddress();
  // show address
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
  $(".inpQuantity").on("change", function (e) {
    let inputvalue = parseInt($(this).val());
    if (isNaN(inputvalue) || inputvalue < 1) {
      $(this).val(1);
    }
    const idProduct = $(this).attr("data-bs-idProduct");
    if (currentIdProduct != idProduct && currentIdProduct != undefined) {
      clearTimeout(debounceTimer);
      updateQuantity(currentIdProduct, currentQuantityProduct);

      currentIdProduct = idProduct;
      currentQuantityProduct = inputvalue;
    }
    debounce(updateQuantity, 500)(idProduct, inputvalue);
    currentQuantityProduct = inputvalue;
    currentIdProduct = idProduct;
  });
  //   xóa sản phẩm trong giỏ hàng
  $(".deleteProduct").on("click", function (e) {
    const idProduct = $(this).attr("data-bs-idProduct");

    $(this).closest(".row").remove();
    updateQuantity(idProduct, 0);
  });
  // submit form
  $("#formOrder").on("submit", function (e) {
    e.preventDefault();
    const isEmptyAddress =
      $('input[name="addressDelivery"]').val() &&
      $('input[name="nameDelivery"]').val() &&
      $('input[name="phoneDelivery"]').val();
    if (!isEmptyAddress) {
      alert("Vui lòng chọn địa chỉ giao hàng");
      return false;
    }
    e.target.submit();
  });
  // xử lý chọn sản phẩm đặt hàng
  $(".cbxIsBuy").on("change", function (e) {
    const idCart = $(this).attr("data-bs-idCart");
    const isBuy = $(this).is(":checked") ? 1 : 0;
    $.ajax({
      url: "/api/updateIsBuyCart",
      type: "POST",
      data: { idCart, isBuy },
      dataType: "json",
      success: function (response) {
        console.log("thành công cập nhật isBuy");
        loadTotal();
      },
      error: function (xhr, status, error) {
        console.log("lỗi check isBuy");
      },
    });
  });
});
