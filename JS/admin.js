var listAdmin = function() {
    var listadmin = "";
    for (let i in user) {
        listadmin +=
            `<tr>
                <td> ${ user[i].id}  </td>
                <td> ${ user[i].name}  </td>
                <td> ${ user[i].email}  </td>
                <td> ${ user[i].password}  </td>
                <td> ${ user[i].phone}  </td>
                <td> ${ user[i].role}  </td>
                <td><button onclick="updateUser( ${user[i].id})" class="btn btn-outline-danger"  data-toggle="modal" data-target="#updateUser"><i class="fas fa-cogs"></i></button>
                <button onclick="deleteUser(${user[i].id})" class = "btn ml-1 btn-outline-warning"><i class="fas  fa-trash"></i></button></td>
            </tr>`;
    }
    document.getElementById("user-admin").innerHTML = listadmin;
}
loadAdmin();

function loadAdmin(){
    listAdmin();
}
// Them nguoi dung
var addUser = function() {
    var User = {
        id: "user" + parseInt(user.length + 1),
        name: document.getElementById("name").value,
        password: document.getElementById("password").value,
        sdt: document.getElementById("sdt").value,
        email: document.getElementById("eamil").value,
        role: document.getElementById("role").value,
    }
    callAPI('users',"POST", User).then((response)=>{
        alert("Thêm user thành công");
        loadAdmin();
    })
    window.location.reload();
}

// xoa nguoi dung 
var deleteUser = function(i) {
    var r = confirm("Ban có thực sự muốn xóa");
    if (r == true) {
        if(user[i].role!="admin"){
            callAPI(`users/${i}`, "DELETE", null).then((response) => {
                loadAdmin();
                alert("Xoá thành công!");
            });
        }
        if (users[i].role == "admin") {
            alert("Không thể xóa admin")
        }
      
    }
    window.location.reload();

}

// chỉnh sua nguoi dung
var updateUser = function(i) {
    callAPI(`user/${i}`,"GET", null).then((res)=>{
        User=res.data
        document.getElementById("idd").value = User.id;
        document.getElementById("name").value = User.name,
        document.getElementById("password").value = User.password,
        document.getElementById("sdt").value = User.phone,
        document.getElementById("eamil").value = User.email,
        document.getElementById("role").value = User.role
    });

    document.getElementById("idd").setAttribute("disabled", "disabled");
    document.getElementById("submitUpdateUser").innerHTML = '<button class="btn btn-outline-danger mt-3" onclick="submitUpdateUser(' + i + ')"> Đồng ý <button>';
}

// gửi phần chỉnh sửa user
var submitUpdateUser = function(i) {
    alert("cap nhat thanh cong")

    var k = user[i];
        k.id = document.getElementById("idd").value,
        k.name = document.getElementById("named").value,
        k.password = document.getElementById("passwordd").value,
        k.phone = document.getElementById("sdtd").value,
        k.email = document.getElementById("eamild").value,
        k.role = document.getElementById("roled").value,

        // document.getElementById("idd").setAttribute("disabled", "disabled");
        // localStorage.setItem('listUser', JSON.stringify(user));
        // Save();
    window.location.reload();

}




var productProduct = function() {
    var listproduct = "";
    for (let i in product) {
        listproduct +=
            `<tr>
    <td> ${ product[i].id}  </td>
    <td> ${ product[i].name}  </td>
    <td><img src="${ product[i].img }" alt="" style="width: 100px; border-radius:24px"></td>
    <td> ${product[i].price}  </td>
    <td><button onclick="updateProduct('${product[i].id}')" class="btn btn-outline-danger"  data-toggle="modal" data-target="#updateProduct"><i class="fas fa-cogs"></i></button>
    <button onclick="deleteProduct('${product[i].id}')" class = "btn ml-1 btn-outline-warning"><i class="fas  fa-trash"></i></button></td>
    </tr>`;
    }
    document.getElementById("product-admin").innerHTML = listproduct;
}
load();

function load(){
    productProduct();
}
// Thêm sản phẩm
var addProduct = function() {
    var Product = {
        id: "SP" +(id + 1),
        name: document.getElementById("name").value,
        img: document.getElementById("img").value,
        price: document.getElementById("price").value
    }
    callAPI("products", "POST", Product).then((response) => {
        alert("Thêm sản phẩm thành công");
        load();
    });
   
}

// Xoa san pham
var deleteProduct = function(i) {
    // i = parseInt(i);
    console.log(i);
    var r = confirm("Ban có thực sự muốn xóa");
    if (r == true) {
        callAPI(`products/${i}`, "DELETE", null).then((response) => {
            load();
            alert("Xoá thành công!");
        });
    }
    window.location.reload();
}

// chỉnh sửa sản phẩm
var updateProduct = function(i) {

    callAPI(`products/${i}`,"GET", null).then((res)=>{
        let ProductU;
        ProductU=res.data;
        document.getElementById("idd").value = ProductU.id;
        document.getElementById("named").value = ProductU.name;
        document.getElementById("imgd").value = ProductU.img;
        document.getElementById("priced").value = ProductU.price;
        document.getElementById("idd").setAttribute("disabled", "disabled");
    });
    
    document.getElementById("submitUpdateProduct").innerHTML = `<button class="btn btn-outline-danger mt-3" onclick="submitUpdateProduct(${i})"> Đồng ý <button>`;
};

// gửi phần chỉnh sửa sản phẩm
var submitUpdateProduct = function(i) {
    // i=parseInt(i);
    // console.log(i);
    let ProducutU={
        id:"",
        name: "",
        img:"",
        price:""
    }
        ProducutU.id = document.getElementById("idd").value;
        ProducutU.name = document.getElementById("named").value;
        ProducutU.img = document.getElementById("imgd").value;
        ProducutU.price = document.getElementById("priced").value;

    document.getElementById("idd").setAttribute("disabled", "disabled");

    callAPI(`products/${i}`,"PUT", ProducutU).then((res)=> {
        load();
        alert("Cập nhận thành công");
    });
    window.location.reload();
}

