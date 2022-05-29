     // data 박스를 감싸고 있는 div class 가져오기
     const dataBox = document.querySelector('.main');

     // 스크롤 시 몇번째까지 보여줬는지 체크하기 위해서 사용
     let num = 0;

     // 스크롤이 맨 아래로 내려갔을 때
     window.addEventListener('scroll', () => {
         // innerHeight = 수평 스크롤 막대의 높이를 포함하여 창의 내부 높이 픽셀단위
         // scrollY = 수직으로 얼마나 스크롤 되었는지 픽셀단위
         let val = window.innerHeight + window.scrollY; // 스크롤된 픽셀  + 창의 높이 픽셀

         // document.body.offsetHeight = 전체 높이
         if (val >= document.body.offsetHeight) {
             num++;
             showList(num);
         }
     })


     async function showList(num) {
         const result = await getContent(num);
         result.forEach((data, idx) => {
             let temp = '';
             data.tag.forEach(tag => {
                 temp = temp + '#' + tag + ' ';
             });
             let html = '';
             html = `<div class="data">
                 <a href='/spots/info/${data.contentsid}'>
                 <div><img src=${data.thumbnailpath}></div>
                 <div>${data.title}</div>
                 <div>${data.introduction}</div>
                 <div>${data.address}</div>
                 </a>
                 <div>${temp}</div><hr>
             </div>`

             dataBox.insertAdjacentHTML('beforeend', html);

         })
     }

     // 내용 가져오기 
     async function getContent(num) {
         // 전체 리스트 10개씩 가져오기
         const data = await fetch(`/spots/${num}`);

         /* 카테고리별 리스트 10개씩 가져오기 
         const data = await fetch(`/spots/category/${num}?contentValue=c4`);
         */
         return data.json();
     }
