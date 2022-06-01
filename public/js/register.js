    function sample6_execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                // if(data.userSelectedType === 'R'){
                //     // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                //     // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                //     if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                //         extraAddr += data.bname;
                //     }
                //     // 건물명이 있고, 공동주택일 경우 추가한다.
                //     if(data.buildingName !== '' && data.apartment === 'Y'){
                //         extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                //     }
                //     // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                //     if(extraAddr !== ''){
                //         extraAddr = ' (' + extraAddr + ')';
                //     }
                //     // 조합된 참고항목을 해당 필드에 넣는다.
                //     document.getElementById("sample6_extraAddress").value = extraAddr;
                
                // } else {
                //     document.getElementById("sample6_extraAddress").value = '';
                // }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                // document.getElementById('sample6_postcode').value = data.zonecode;
                document.getElementById("userAddr1").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("userAddr2").focus();
            }
        }).open();
    }

    
	/* button이 클릭되었을때 이벤트 */
	document.getElementById("registerBtn").addEventListener('click', () => {
        var userId = document.getElementById("userId").value;
        var userPw = document.getElementById("userPw").value;
        var userPwcheck = document.getElementById("userPWcheck").value;
        var userName = document.getElementById("userName").value;
        var userBirth = document.getElementById("userBirth").value;
        
        var userGender = document.getElementById("userGender");
        userGender = userGender.options[userGender.selectedIndex].value;

        var userMail = document.getElementById("userMail").value;
        var userAddr1 = document.getElementById("userAddr1").value;
        var userAddr2 = document.getElementById("userAddr2").value;
        
        if(!userId || !userPw || !userPwcheck || !userName || !userBirth || !userMail || !userAddr1 || !userAddr2 || userGender==="선택"){
            alert('모든 값을 입력해주세요.');
            return false;
        }

        if(userPw != userPwcheck){
            alert('비밀번호와 비밀번호 확인값이 맞지 않습니다.');
            return false;
        }

        fetch(`/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            userPw: userPw,
            userName: userName,
            userBirth: userBirth,
            userMail: userMail,
            userAddr1: userAddr1,
            userAddr2: userAddr2,
            userGender: userGender
        })
    // if(response.ok){
    //     location.href = "/users/login";
    // }else{
    //     alert('회원가입에 실패하였습니다.');
    // }
    }).then((res) => {
        if (res.status === 200) {
            location.href = "/users/login";
        }else{
            return res.json();
        }
    }).then((data) => {
        alert(data.message);
    })
});