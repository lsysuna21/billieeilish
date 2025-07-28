$(document).ready(function(){

  // 스크롤 네비
  let lastScrollY = window.scrollY;
  const topWrap = document.querySelector(".top_wrap");

  window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY) {
      topWrap.style.top = "-120px"; // header + nav 높이만큼 위로 숨김
    } else {
      topWrap.style.top = "0";
    }
    lastScrollY = window.scrollY;
  });

  // 이미지 좌우 스크롤(메인)
  var swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
    initialSlide: 2,
    pagination: {
      el: ".swiper-pagination",
      clickable: true, // 클릭으로 이동 가능
    },
  });


  //Scroll  
  let ani = $('.ani');
  $.fn.scrollMoving = function(){
    let elementTop = $(this).offset().top;  //선택한 요소의 Y축 좌표값
    let elementBottom = elementTop + $(this).outerHeight();//Y축 좌표값+현재요소의 높이값  

    let viewportTop = $(window).scrollTop();//화면의 스크롤값
    let viewportBottom = viewportTop + $(window).height();//스크롤값+화면의 높이

    //들어오는 시점과 나가는 시점을 알아내서 내보냄
    return (viewportTop < elementBottom) && (elementTop < viewportBottom);
  };

  $(window).on('load scroll',function(){
    //.ani가 할일
    //선택한 요소에 위에서 만든 scrollMoving()이라는 사용자 정의 메서드를 사용할수 있음
    ani.each(function(){
      if($(this).scrollMoving()){
        $(this).addClass("moving");
      }
      else{
        $(this).removeClass("moving");
      }
    });
  });



  /* 상품 페이지 카테고리 토글 */
  $('.filter-title').on('click', function() {
    const $arrow = $(this).find('.arrow');
    const $box = $(this).next('.filter-box');

    $box.slideToggle(200); 
    $arrow.toggleClass('rotate'); 
  });

  // 하트 클릭시 바뀜
  $('.fa-heart').on('click', function () {
    const $icon = $(this);
  
    $icon.css('opacity', '0');
    setTimeout(function () {
      $icon.toggleClass('fa-regular fa-solid'); 
      $icon.css('opacity', '1'); 
    }, 100); 
  });


  /* 목걸이 이미지 바뀜 */
  let fadeContainer = $(".fade"),
      fadeImage = fadeContainer.find(".fade-items ul li"),
      fadeIndicator = fadeContainer.find(".fade-indicator a"),
      fadePrev = fadeContainer.find(".fade-side .prev"),
      fadeNext = fadeContainer.find(".fade-side .next"),
      oldidx = 0,
      idx=0,  
      fadeCount = fadeImage.length,
      interval = 4000;

  //이미지와 버튼이 바뀌는 함수
  function fadeAni(idx){ 
    if(oldidx != idx){ 
      fadeIndicator.eq(oldidx).removeClass("active");
      fadeIndicator.eq(idx).addClass("active"); 
      fadeImage.eq(oldidx).stop().fadeOut("300");
      fadeImage.eq(idx).stop().fadeIn("300"); 
    };
    oldidx = idx; 
  };

  //자동Fade함수 
  function fadeAuto(){
    fadeTimer = setInterval(function(){
      idx = (oldidx + 1) % fadeCount;
      fadeAni(idx);
    },interval);
  };
  fadeAuto();

  //Indicator(하단버튼)
  fadeIndicator.click(function(){
    idx = $(this).index();
    fadeAni(idx);
  });

  //좌우버튼
  fadePrev.click(function(){
    idx--;
    if(idx < 0){ 
      idx = fadeCount-1; 
    }
    fadeAni(idx);
  });
  fadeNext.click(function(){
    idx++;
    if(idx > fadeCount-1){ 
      idx=0; 
    }
    fadeAni(idx);
  });

  fadeContainer.mouseenter(function(){
    clearInterval(fadeTimer);
  })
  .mouseleave(function(){
    fadeAuto();
  });

  // 목걸이 구매페이지 수량버튼
  let quantity = 1;
  $('#decrease').click(function () {
    if (quantity > 1) {
      quantity--;
      $('#quantity').text(quantity);
    }
  });
  $('#increase').click(function () {
    quantity++;
    $('#quantity').text(quantity);
  });
  
});

document.getElementById("addToCartBtn").addEventListener("click", function () {
  const star = document.querySelector(".star-effect");
  star.classList.add("active");
});


