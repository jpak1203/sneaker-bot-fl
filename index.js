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
    //browser.deleteCookie();
    //browser.refresh(); 
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
    // payment(); For Credit Card Info Input
  });
});

function checkout() {
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
  browser.waitForEnabled('a[data-btnname="checkout_billingContinue"]');
  browser.click('a[data-btnname="checkout_billingContinue"]');
  browser.waitForExist('#address_verification_use_original_button');
  browser.click('#address_verification_use_original_button'); 
  browser.waitForExist('#inventoryCheck_panel', '' , true);
  browser.click('a[data-btnname="checkout_shippingMethodContinue"]');
  browser.pause(3000);
}
