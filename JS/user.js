var x = document.getElementById("login-form");
var y = document.getElementById("register-form");
var z = document.getElementById("pointer-btn");
var l = document.getElementById("login");
var r = document.getElementById("register");
var ac = document.getElementById("action_title");

function register1() {
    x.style.left = "-450px";
    y.style.left = "25px";
    z.style.left = "215px";
    l.style.color = "#848484";
    r.style.color = "#00ffc3";
    ac.textContent = "Register";
}

function login1() {
    x.style.left = "25px";
    y.style.left = "450px";
    z.style.left = "30px";
    l.style.color = "#00ffc3";
    r.style.color = "#848484";
    ac.textContent = "Login";
}


var signup = function() {
    var User = {
        id: "User" + parseInt(user.length + 1),
        name: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phoned").value,
        role: "",
        password: document.getElementById("passworded").value,
        confirmpassword: document.getElementById("passwordedd").value,
    }
    let sdt = User.phone;
    let name = User.name;
    let email = User.email;
    let password = User.password;
    let cpassword = User.confirmpassword;
    var checkPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;
    const checkCharacter = /^[a-z]/;
    if (name & password & cpassword & email) {
        alert("Vui long nhap du thong tin")
        console.log(User)
        return;

    } else {

        if (!(checkCharacter.test(email))) {
            alert("Tên đăng nhập không hợp lệ.")
            console.log(email + name + password);
            return false;

        }
        if (!checkPass.test(password)) {
            alert('Vui lòng nhập mật khẩu từ 6-10 kí tự và có ít 1 nhất số, chữ thường và chữ hoa.')
            return false;
            //console.log(email + username + password + cpassword);
        }
        var checkEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!checkEmail.test(email)) {
            alert('Hay nhap dia chi email hop le.\nExample@gmail.com');
            // email.focus;
            return false;

        }
        if (cpassword != password) {
            alert("mat khau xac nhan chua dung");
            return;
        }
        var checkPhoneNumber = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if (checkPhoneNumber.test(sdt) == false) {
            alert("dinh dang so dien thoai chua dung");
            return;
        }
    }

    var exist = user.find(u => u.email === User.email)
    if (exist) {
        alert('Tên tài khoản đã tồn tại!');
        return;
    }

    var x = parseInt(getRandomArbitrary(100000, 999999));
    //mail gửi xác minh
    Email.send({
        SecureToken: "921b4442-e2ed-4ec3-94bd-d2ee608d7801",
        From: 'trunghoangquan@gmail.com',
        To: User.email,
        Subject: "Chào mừng bạn đến với nhà hàng chúng tôi!!!",
        Body: "<p>" + "Dưới đây là mã xác nhận mật khẩu và tài khoản của quý khách để truy cập trang web đặt hàng" + "</p>" + x
    }).then(
        message => alert("Gửi mail thành công")
    );

    var num = prompt("Mã xác nhận đăng ký của bạn đã được gửi qua email. Vui lòng nhập mã xác nhận: ", "******");
    var y = parseInt(getRandomArbitrary(100000, 999999));

    if (num = x) {
        alert("Đăng kí thành công! Vui lòng đăng nhập lại")
        User.role = "user";
        Email.send({
            SecureToken: "921b4442-e2ed-4ec3-94bd-d2ee608d7801",
            From: 'trunghoangquan@gmail.com',
            To: User.email,
            Subject: "Chào mừng bạn đến với nhà hàng chúng tôi!!!",
            Body: "<p>" + "Dưới đây là mật khẩu và tài khoản của quý khách để truy cập trang web đặt hàng" + "</p>" +
                "<p>" + "Username:" + User.email + "</p>" +
                "<p>" + " Password: " + User.password + "</p>"
        }).then(
            message => alert("Gửi mail thành công")
        );

        user.push(User);
        callAPI("user", "POST", User).then(reponse => {
            alert("Thêm vào thành công");
        });

        login1();
    }

}

//function random password
const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
};



function signin() {
    var username = document.getElementById("named").value;
    var password = document.getElementById("password").value;
    // user = JSON.parse(localStorage.getItem('listUser'));
    var b = false;
    for (var i in user) {
        var newuser = JSON.parse(JSON.stringify(user[i]))
        if (username == newuser.email && password == newuser.password && user.role != "admin") {
            alert("Đăng nhập thành công");
            document.getElementById("account").style.display = "none";
            document.getElementById("userAccount").innerHTML = newuser.name;
            b = true;
            $('#exampleModal').modal('hide');
        }
        // localStorage.setItem('loggedInUsers', JSON.stringify(user))
    }
    if (!b)
        alert("Đăng nhập thất bại xin vui lòng đăng kí tài khoản");
}

var loadData = function() {
    const arr1 = document.getElementsByClassName('is-logged-in');
    const arr2 = document.getElementsByClassName('is-not-logged-in');
    if (user) {
        // const user = JSON.parse(localStorage.getItem('loggedInUsers'));
        document.getElementById('logged-in-username').innerHTML = user.name;
        // document.getElementById('logged-in-username').style.visibility = "hidden";
        for (const element of arr1) {
            element.setAttribute('style', 'display: none');
        }
        for (const element of arr2) {
            element.setAttribute('style', 'display: block');
        }
    } else {
        for (const element of arr1) {
            element.setAttribute('style', 'display: block');
        }
        for (const element of arr2) {
            element.setAttribute('style', 'display: none');
        }
    }
}

var logOut = function() {
        // localStorage.removeItem("loggedInUsers");
        const arr1 = document.getElementsByClassName('is-logged-in');
        const arr2 = document.getElementsByClassName('is-not-logged-in');
        if (user) {
            const user = JSON.parse(localStorage.getItem('loggedInUsers'));
            document.getElementById('logged-in-username').innerHTML = user.username;
            for (const element of arr1) {
                element.setAttribute('style', 'display: block');
            }
            for (const element of arr2) {
                element.setAttribute('style', 'display: none');
            }
        } else {
            for (const element of arr1) {
                element.setAttribute('style', 'display: none');
            }
            for (const element of arr2) {
                element.setAttribute('style', 'display: block');
            }
        }
        return loadData();
    }
    //Hiện Ẩn mật khẩu trong đăng kí đăng nhập
let showPassword = false
const ipnElement = document.querySelector('#password')
const btnElement = document.querySelector('#btnPassword')

const passElement = document.querySelector('#passworded')
const buttonElement = document.querySelector('#btnPasswordd')


const confirmElement = document.querySelector('#passwordedd')
const butonElement = document.querySelector('#bPassworddd')

btnElement.addEventListener('click', togglePassword);
buttonElement.addEventListener('click', toggPassword);
butonElement.addEventListener('click', toPassword);



function togglePassword() {
    if (showPassword) {
        // Đang hiện password
        // Chuyển sang ẩn password
        ipnElement.setAttribute('type', 'password')
        showPassword = false
    } else {
        // Đang ẩn password
        // Chuyển sang hiện password
        ipnElement.setAttribute('type', 'text')
        showPassword = true
    }
}

function toggPassword() {
    if (showPassword) {
        // Đang hiện password
        // Chuyển sang ẩn password
        passElement.setAttribute('type', 'password')
        showPassword = false
    } else {
        // Đang ẩn password
        // Chuyển sang hiện password
        passElement.setAttribute('type', 'text')
        showPassword = true
    }
}

function toPassword() {
    if (showPassword) {
        // Đang hiện password
        // Chuyển sang ẩn password
        confirmElement.setAttribute('type', 'password')
        showPassword = false
    } else {
        // Đang ẩn password
        // Chuyển sang hiện password
        confirmElement.setAttribute('type', 'text')
        showPassword = true
    }
}