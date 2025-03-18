$(document).ready(function () {
  const tempLocation = $("#location").val() || "[10.04626, 105.766599]";

  var map = L.map("map").setView(JSON.parse(tempLocation), 18);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  L.marker(JSON.parse(tempLocation))
    .addTo(map)
    .bindPopup(`Vị trí đã chọn`)
    .openPopup();
  // Add marker click event
  var selectedCoordinates = null;

  map.on("click", function (e) {
    selectedCoordinates = {
      lat: e.latlng.lat,
      lon: e.latlng.lng,
    };
    $("#location").val(`[${e.latlng.lat}, ${e.latlng.lng}]`);
    $("input[name='location']").val(`[${e.latlng.lat}, ${e.latlng.lng}]`);

    // Remove old marker
    map.eachLayer(function (layer) {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
    L.marker([selectedCoordinates.lat, selectedCoordinates.lon])
      .addTo(map)
      .bindPopup(`Vị trí đã chọn`)
      .openPopup();
  });
  // process province, district, ward
  const eleProvince = $("#province");
  const eleDistrict = $("#district");
  const eleWard = $("#ward");
  const eleAddress = $("#address");
  eleProvince.prop("disabled", false);
  eleDistrict.prop("disabled", false);
  eleWard.prop("disabled", false);
  let isFirstProvince = true;
  let isFirstDistrict = true;
  let isFirstWard = true;
  let isFirstLocation = true;

  // set province options
  $.ajax({
    url: "https://provinces.open-api.vn/api/?depth=1",
    type: "GET",
    success: function (data) {
      data.forEach((province) => {
        eleProvince.append(
          `<option value="${province.name}" data-code="${province.code}">${province.name}</option>`
        );
      });
      if (isFirstProvince) {
        isFirstProvince = false;
        const province = eleProvince.data("province");

        eleProvince.val(province).change();
      }
    },
  });
  // handle change province
  eleProvince.on("change", function () {
    const province = eleProvince.val();
    const provinceCode = eleProvince.find(":selected").data("code");
    eleDistrict.prop("disabled", false);
    eleDistrict.empty();
    eleWard.prop("disabled", true);
    eleWard.empty();
    if (province == "" || province == null) {
      eleDistrict.prop("disabled", true);

      return;
    }
    $.ajax({
      url: `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`,
      type: "GET",
      success: function (data) {
        eleDistrict.append(`<option value="">Vui lòng chọn</option>`);
        data.districts.forEach((district) => {
          eleDistrict.append(
            `<option value="${district.name}" data-code="${district.code}">${district.name}</option>`
          );
        });
        if (isFirstDistrict) {
          isFirstDistrict = false;
          const district = eleDistrict.data("district");
          eleDistrict.val(district).change();
        }
      },
    });
    handleChangeLocation();
  });
  // handle change district
  eleDistrict.on("change", function () {
    const province = eleProvince.val();
    const district = eleDistrict.val();
    const provinceCode = eleProvince.find(":selected").data("code");
    const districtCode = eleDistrict.find(":selected").data("code");
    if (district == "" || district == null) {
      eleWard.prop("disabled", true);
      return;
    }
    eleWard.prop("disabled", false);
    eleWard.empty();
    $.ajax({
      url: `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`,
      type: "GET",
      success: function (data) {
        eleWard.append(`<option value="">Vui lòng chọn</option>`);
        data.wards.forEach((ward) => {
          eleWard.append(`<option value="${ward.name}">${ward.name}</option>`);
        });
        if (isFirstWard) {
          isFirstWard = false;
          const ward = eleWard.data("ward");
          eleWard.val(ward).change();
        }
      },
    });
    handleChangeLocation();
  });
  // handle change ward
  eleWard.on("change", function () {
    // call api find location
    if (isFirstLocation) {
      isFirstLocation = false;
      return;
    }
    $.ajax({
      url: `https://nominatim.openstreetmap.org/search`,
      type: "GET",
      data: {
        format: "json",
        q: `${eleWard
          .val()
          .replace("Xã ", "")
          .replace("Thị trận ", "")
          .replace("Phường ", "")} ${eleDistrict
          .val()
          .replace("Quận ", "")
          .replace("Huyện ", "")} ${eleProvince
          .val()
          .replace("Tỉnh ", "")
          .replace("Thành phố ", "")}`,
      },
      success: function (data) {
        console.log(data);
        if (data.length > 0) {
          map.setView([data[0].lat, data[0].lon], 16);
        }
        if (data.length == 0) {
          $.ajax({
            url: `https://nominatim.openstreetmap.org/search`,
            type: "GET",
            data: {
              format: "json",
              q: `${eleDistrict
                .val()
                .replace("Quận ", "")
                .replace("Huyện ", "")} ${eleProvince
                .val()
                .replace("Tỉnh ", "")
                .replace("Thành phố ", "")}`,
            },
            success: function (data) {
              console.log(data);
              if (data.length > 0) {
                map.setView([data[0].lat, data[0].lon], 16);
              }
            },
          });
        }
      },
    });
    handleChangeLocation();
  });
  function handleChangeLocation() {
    const province = eleProvince.val();
    const district = eleDistrict.val();
    const ward = eleWard.val();
    const address = eleAddress.val();
    if (province == "" || province == null) {
      eleDistrict.prop("disabled", true);
      eleWard.prop("disabled", true);
    }
    if (district == "" || province == null) {
      eleWard.prop("disabled", true);
    }

    console.log(province, district, ward, address);
  }
});
