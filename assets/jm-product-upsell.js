$(document).ready(function () {
  $('#product-upsell-0-name').click(function() {
    $('#popup1').show();
    $('body').css('overflow-y','hidden');
  });
  $('#product-upsell-1-name').click(function() {
    $('#popup2').show();
    $('body').css('overflow-y','hidden');
  });

  $('.popup .close').click(function() {
    $('#popup1').hide();
    $('#popup2').hide();
    $('body').css('overflow-y','unset');
  });

  var productUpsellHandle = ["{{ upsell1.handle }}", "{{ upsell2.handle }}"];
  var productUpsellId = [0, 0];
  var productAddOnQty = 1;
  productUpsellHandle.forEach(function (value, i) {
    jQuery.getJSON('/products/' + value + '.js', function (product) {
      if (product.variants[0].available && product.variants[0].id != {{ current_variant.id }} ) {
        productUpsellId[i] = product.variants[0].id;
        $("#popup"+ (i+1)).removeClass("d-none");
        $("#product-upsell-"+ i).removeClass("d-none");
        $("#product-upsell-"+ i +"-name").html(product.title);
        $("#product-upsell-"+ i +"-price").html("+ $" + (product.price_min / 100).toFixed(2));

        $("#product-upsell-"+ i +"-img").attr('src',product.featured_image);
        $("#product-upsell-"+ i +"-title").html(product.title);
        $("#product-upsell-"+ i +"-money").html("$" + (product.price_min / 100).toFixed(2));
        $("#product-upsell-"+ i +"-description").html(product.description);
      }
    });
  });
  $('#AddToCart-{{ section.id }}').click(function (e) {
    e.preventDefault();
    var productUpsellChecked0 = $("#product-upsell-check-0").is(":checked");
    var productUpsellChecked1 = $("#product-upsell-check-1").is(":checked");
    if ((productUpsellChecked0 && !productUpsellChecked1)
        && productUpsellId[0] !== 0) {
      productAddToCart(productUpsellId[0]);
    } else if ((!productUpsellChecked0 && productUpsellChecked1)
               && productUpsellId[1] !== 0) {
      productAddToCart(productUpsellId[1]);
    } else if ((productUpsellChecked0 && productUpsellChecked1)
               && (productUpsellId[0] !== 0 || productUpsellId[1] !== 0)) {
      productAddToCartUpsell();
    } else {
      $("form[action='/cart/add']").submit();
    }
  });
  function productAddToCart(upsell_id) {
    $.ajax({
      url: "/cart/add.js",
      type: "POST",
      data: {
        items: [
          {
            quantity: productAddOnQty,
            id: upsell_id
          }
        ]
      },
      dataType: "json"
    })
    .done(function () {

    })
    .always(function () {
      $("form[action='/cart/add']").submit();
    });
  }

  function productAddToCartUpsell() {
    $.ajax({
      url: "/cart/add.js",
      type: "POST",
      data: {
        items: [
          {
            quantity: productAddOnQty,
            id: productUpsellId[0]
          },
          {
            quantity: productAddOnQty,
            id: productUpsellId[1]
          }
        ]
      },
      dataType: "json"
    })
    .done(function () {

    })
    .always(function () {
      $("form[action='/cart/add']").submit();
    });
  }
});