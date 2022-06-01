window.onload = function() {
	var httpRequest;
	/* button이 클릭되었을때 이벤트 */
	document.getElementById("loginBtn").addEventListener('click', () => {

        var userId = document.getElementById("userId").value;
        var userPw = document.getElementById("userPw").value;
        let response = fetch(`/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            userPw: userPw
        })
    }).then((res) => {
        if (res.status === 200) {
            location.href = "/";
        }else{
            return res.json();
        }
    }).then((data) => {
        alert(data.message);
    })
});
}