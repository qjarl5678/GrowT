// data 박스를 감싸고 있는 div class 가져오기
const dataBox = document.querySelector(".main");

// 스크롤 시 몇번째까지 보여줬는지 체크하기 위해서 사용
let num = 0;

// 스크롤이 맨 아래로 내려갔을 때
window.addEventListener("scroll", () => {
  // innerHeight = 수평 스크롤 막대의 높이를 포함하여 창의 내부 높이 픽셀단위
  // scrollY = 수직으로 얼마나 스크롤 되었는지 픽셀단위
  let val = window.innerHeight + window.scrollY; // 스크롤된 픽셀  + 창의 높이 픽셀

  // document.body.offsetHeight = 전체 높이
  if (val >= document.body.offsetHeight) {
    num++;
    showList(num);
  }
});

async function showList(num) {
  const result = await getContent(num);
  result.forEach((data, idx) => {
    let temp = "";
    data.tag.forEach((tag) => {
      temp =
        temp +
        '<span><a href="/spots/tag/' +
        tag +
        '">#' +
        tag +
        " </a></span>";
    });
    let html = "";
    html = `<div class="data">
                 <a href='/spots/info/${data.contentsid}'>
                 <div><img src=${data.thumbnailpath}></div>
                 <div class="spotLike"><i class="fa-solid fa-heart"></i>${data.likeNum}</div>
                 <div class="spotTitle">${data.title}</div>
                 <div class="spotIntroduction">${data.introduction}</div>
                 <div class="spotAddress">${data.address}</div>
                 </a>
                 <div>${temp}</div><hr>
             </div>`;

             console.log(data.likeNum);

    dataBox.insertAdjacentHTML("beforeend", html);
  });
}

// 내용 가져오기
async function getContent(num) {
  if (method === "all") {
    // 전체 리스트 10개씩 가져오기
    const data = await fetch(`/spots/${num}`);
    return data.json();
  } else if (method === "category") {
    // 카테고리 리스트 10개씩 가져오기
    const data = await fetch(`/spots/category/${num}/${value}`);
    return data.json();
  } else if (method === "tag") {
    // 태그 리스트 10개씩 가져오기
    const data = await fetch(`/spots/tag/${num}/${value}`);
    return data.json();
  }
}

function categoryList(){
    const list = document.getElementById('categoryL');

    if(list.value ==='click'){
        list.style.display ='none';
        list.value="nonclick";
    }else{
        list.style.display ='block';
        list.value = 'click';
    }
    
}



// 헤더 제목 붙이기 로직
const header_name = document.getElementById("header_name");

if (method === "all") {
    header_name.innerHTML = '전체';
} else if (method === "category") {
    if(value==='c1'){
        header_name.innerHTML = '관광지';
    }else if(value==='c3'){
        header_name.innerHTML = '숙박';
    }else if(value==='c4'){
        header_name.innerHTML = '음식점';
    }
} else if (method === "tag") {
    header_name.innerHTML = '#'+value;
}