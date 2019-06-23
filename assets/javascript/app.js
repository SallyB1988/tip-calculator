// REGEX patterns used to validate input
  const regex_currency = /^((\d+)(\.\d{2})?)$/;
  const regex_float = /^\d+(\.\d*)?$/;

  window.onload = () => {
// not sure I need anything here
  }


  $("#submit").on("click", (e) => {
    e.preventDefault();
    // get values from form. Trim empty spaces off string. Remove leading zeroes
    let cost = $("#cost").val().trim();
    console.log(cost);
    if (cost[0] === ".") cost = "0"+cost;
    console.log('updated cost: '+cost);
    let tipPercent = $("#tip").val().trim();
    if (tipPercent[0] === ".") tipPercent = "0"+tipPercent;
    let split = $("#split").val().trim();
    let tipValue = 0;
    
    // Validation
    let errorMsg = "";
    if ( !isValidCurrency(cost) ) {
      errorMsg = errorMsg + "\nInvalid Cost of Meal value"
    }
    if ( !isValidTip(tipPercent) ) {
      // Validate tip percent input
      errorMsg = errorMsg + "\nInvalid Tip Percentage value"
    }

    if (errorMsg !== "" ) {
      alert(errorMsg)
    } else {
      tipValue = cost*(tipPercent/100.)/split;
      $("#tipAmount").html(`Tip Amount Per Person: \t$${tipValue.toFixed(2)}`);
    }

  })

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

  const clearFormFields = () => {
    $("#cost").val('');
    $("#tip").val('');
    $("#split").val('1');
  }

