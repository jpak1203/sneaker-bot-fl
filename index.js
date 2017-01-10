'use strict';
var info = require('./info');
describe('onload', function () {
  it('cop', function () {
    browser.url(info.url);
    var size = info.size;
    if (size.length < 2) {
      size = "0" + size + ".0";
    } else {
      size = size + ".0";
    }

    browser.click('#pdp_size_select_mask');
    browser.waitForVisible('a[value="'+size+'"]');
    browser.click('a[value="'+size+'"]');
    browser.waitForEnabled("#pdp_addtocart_button");
    browser.click('#pdp_addtocart_button');
    browser.waitForVisible('a[data-btnname="minicart_viewFullCart"]');
    browser.click('a[data-btnname="minicart_viewFullCart"]');
    browser.waitForVisible('a[data-btnname="cart_checkout"]');
    browser.click('a[data-btnname="cart_checkout"]');
    checkout();
    payment();
    browser.waitForExist('#inventoryCheck_panel', '' , true);
    // UNCOMMENT TO BUY!
    // browser.click('#orderSubmit');
  });
});

function checkout() {
  console.log('checkout start');
  browser.waitForExist('#billFirstName');
  browser.setValue('#billFirstName', info.firstName);
  browser.setValue('#billLastName', info.lastName);
  browser.setValue('#billAddress1', info.billing.addressLine1);
  browser.setValue('#billAddress2', info.billing.addressLine2);
  browser.setValue('#billPostalCode', info.billing.zipCode); 
  browser.waitForEnabled('#billHomePhone');
  var phone = $('#billHomePhone');
  while (phone.getValue().replace(/ /g, '') !== info.phoneNumber) { 
    browser.setValue('#billHomePhone', info.phoneNumber);
  } 
  var email = $('#billEmailAddress');
  while (email.getValue() !== info.email) {
    browser.setValue('#billEmailAddress', info.email);
  }
  browser.click('#billPaneShipToBillingAddress');
  browser.waitForExist('#shipFirstName');
  browser.setValue('#shipFirstName', info.firstName);
  browser.setValue('#shipLastName', info.lastName);
  browser.setValue('#shipAddress1', info.shipping.addressLine1);
  browser.setValue('#shipAddress2', info.shipping.addressLine2);
  browser.setValue('#shipPostalCode', info.shipping.zipCode); 
  browser.waitForEnabled('#shipHomePhone');
  var phone = $('#shipHomePhone');
  while (phone.getValue().replace(/ /g, '') !== info.phoneNumber) { 
    browser.setValue('#shipHomePhone', info.phoneNumber);
  }
  browser.waitForExist('#inventoryCheck_panel', '' , true);
  browser.waitForEnabled('a[data-btnname="checkout_shippingContinue"]');
  browser.click('a[data-btnname="checkout_shippingContinue"]');
  browser.waitForExist('#address_verification_use_original_button');
  browser.click('#address_verification_use_original_button'); 
  browser.waitForExist('#inventoryCheck_panel', '' , true);
  browser.click('a[data-btnname="checkout_shippingMethodContinue"]');
}

function payment() {
  console.log('payment start');
  browser.waitForExist('#inventoryCheck_panel', '' , true);
  browser.setValue('#CardNumber', info.payment.number);
  browser.setValue('#CardExpireDateMM', info.payment.month);
  browser.setValue('#CardExpireDateYY', info.payment.year);
  browser.setValue('#CardCCV', info.payment.csc);
  browser.click('#payMethodPaneContinue');
  browser.pause(3000);
}
