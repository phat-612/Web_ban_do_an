var $inputDisabled = $("#inputQuantityMonAnKem");
var $disabledSwitch = $("#disabledSwitch");
$disabledSwitch.on("change", function () {
  $inputDisabled.prop("disabled", $(this).prop("checked"));
});
