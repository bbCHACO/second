$(function () {
  $(".drawer-icon").on("click", function (e) {
    e.preventDefault();
    $(".drawer-icon").toggleClass("is-active");
    $(".drawer-nav").toggleClass("is-active");
    $(".drawer-overlay").toggleClass("is-active");
    return false;
  });

  $(".header-menu-item").on("click", function () {
    $(".drawer-icon").removeClass("is-active");
    $(".drawer-nav").removeClass("is-active");
    $(".drawer-overlay").removeClass("is-active");
    return false;
  });

  const swiperCard = new Swiper(".swiper-card", {
    // Optional parameters
    loop: true,
    loopedSlides: 6,
    centeredSlides: false,
    spaceBetween: 20,
    width: 274,
    effect: "slide",
    touchStartPreventDefault: false,
    grabCursor: true,
    passiveListeners: false,
    // If we need pagination
    pagination: {
      el: ".swiper-pagination-card",
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next-card",
      prevEl: ".swiper-button-prev-card",
    },

    breakpoints: {
      769: {
        spaceBetween: 40,
        width: 400,
      },
    },
  });

  //QAのドロワー

  $(".QA-title").on("click", function () {
    if ($(this).children(".QA-bar").hasClass(".is-open") === true) {
      $(this).children(".QA-bar").removeClass("is-open");
    }
    $(this).children(".QA-bar").toggleClass("is-open");
    $(this).parent().children(".QA-content").slideToggle();
  });

  //GoogleForm
  let $form = $("#js-form");
  $form.submit(function (e) {
    $.ajax({
      url: $form.attr("action"),
      data: $form.serialize(),
      type: "POST",
      dateType: "xml",
      statusCode: {
        0: function () {
          $form.slideUp();
          $("#js-success").slideDown();
        },
        200: function () {
          $form.slideUp();
          $("#js-error").slideDown();
        },
      },
    });
    return false;
  });

  //formの入力確認
  let $submit = $("#js-submit");
  $("#js-form input, #js-form textarea, #js-form select").on(
    "change",
    function () {
      if (
        $("#js-form input[type='text']").val() !== "" &&
        $("#js-form input[name='entry.1722961324']").prop("checked") === true
      ) {
        //すべて入力されたとき
        $submit.prop("disabled", false);
        $submit.addClass("is-active");
      } else {
        //すべて入力されていないとき
        $submit.prop("disabled", true);
        $submit.removeClass("is-active");
      }
    }
  );

  //スムーススクロールとトップへ戻るボタン
  $(function () {
    $('a[href^="#"]').on("click", function () {
      var header = $("header").outerHeight();
      var id = $(this).attr("href");
      var position = 0;

      if (id !== "#") {
        var position = $(id).offset().top - header;
      }
      $("html,body").animate(
        {
          scrollTop: position,
        },
        300
      );
    });

    $(window).on("scroll", function () {
      if (100 < $(this).scrollTop()) {
        $(".button-return-div").addClass("is-show");
      } else {
        $(".button-return-div").removeClass("is-show");
      }
    });
  });
});
