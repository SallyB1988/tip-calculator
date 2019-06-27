// REGEX patterns used to validate input
  const regex_currency = /^((\d+)(\.\d{2})?)$/; // positive float with max of 2 decimal places
  const regex_float = /^\d+(\.\d*)?$/;  // positive float value
  const regex_int = /^\d+$/;  // positive integer

  $("#submit").on("click", (e) => {
    e.preventDefault();
    // get values from form. Trim empty spaces off string. Remove leading zeroes, if any
    let cost = $("#cost").val().trim();
    if (cost[0] === ".") cost = "0"+cost; // add leading zero if cost is < 1
    let tipPercent = $("#tipSelect input:radio:checked").val()
    if (tipPercent === "other") {
      tipPercent = $("#unique-tip").val().trim();
    }
    if (tipPercent[0] === ".") tipPercent = "0"+tipPercent;
    let split = $("#split").val().trim();
    let tipValue = 0;

    let errorMsg = validateInput(cost, tipPercent, split)

    if (errorMsg !== "" ) {
      alert(errorMsg)
    } else {
      tipValue = cost*(tipPercent/100.)/split;
      $("#tipAmount").html(`Tip Amount Per Person: \t$${tipValue.toFixed(2)}`);
    }

  })

  // select 'other' radio button when unique-tip field is in focus
  $('#unique-tip').focus(function() {
      $('#other').prop("checked", true);
  })

  // clear unique-tip field when a tip option besides 'other' is selected
  $('input[type=radio][name=radiotip]').change(function() {
    if(!($('#unique-tip').is(':focus'))){
      $('#unique-tip').val(null);
    }
  })

  /**
   * Validates all input values. A message is returned containing information
   * about any invalid data.
   * @param {*} cost 
   * @param {*} tip 
   * @param {*} split 
   */
  const validateInput = (cost, tip, split) => {
    let errorMsg = "";
    if ( !isValidCurrency(cost) ) {
      errorMsg = errorMsg + "\nInvalid Cost of Meal value"
    }
    if ( !isValidTip(tip) ) {
      errorMsg = errorMsg + "\nInvalid Tip Percentage value"
    }
    if ( !isValidSplit(split) ) {
      errorMsg = errorMsg + "\nInvalid Split Tip value"
    }
    return errorMsg;
  }

  /**
   * Validates currency format. Must be a positive float with no more than two decimal places.
   * @param {*} value 
   */
  const isValidCurrency = (value) => {
    if (value.match(regex_currency) === null ) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Validates tip percentage input. Must be a positive float value.
   * @param {*} num 
   */
  const isValidTip = (num) => {

    if (num.match(regex_float) === null) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Validates split input. Must be a positive integer.
   * @param {*} num 
   */
  const isValidSplit = (num) => {
    if (num <= 0 || num.match(regex_int) === null) {
      return false;
    } else {
      return true;
    }
  }
