var cart = [];


if (localStorage.getItem('listCart') != null) {
    load();
} else
    save();

displayCart();


function save() {

    localStorage.setItem('listCart', JSON.stringify(cart));
}

function load() {
    cart = JSON.parse(localStorage.getItem('listCart'));
}

function displayCart() {
    if (cart.length != []) {
        document.getElementById("count11").innerHTML = cart.length;
    }
    for (let i in cart) {
        var data = JSON.parse(JSON.stringify(cart[i]))
        var print = `     
                <tr>
                    <th scope="row" style="width:50px;"> <a href="#">${data.name}</a> </th>
                    <td> <input class="cart-quantity-input" type="number" value="${data.quantity}" style="width:50px;"></td>
                    <td>  <img src="${data.img}" alt=" " style="width:120px; height:120px;" ></td>
                    <td> <span class="price">${data.price}</span></td>                 
                </tr>
                <tr scope=row>
                    <button class="btn btn-danger" id="removeBtn" type="button" onclick="deleteItem(${i})" >REMOVE</button>
                </tr>`;
        document.getElementById("carts").innerHTML += print;
    }
}



//Xóa sản phẩm trong giỏ hàng
var deleteItem = function(i) {
    //nếu có nhiều sản phẩm thì trừ đi 1
    if (cart[i].quantity != 1) {
        cart[i].quantity = cart[i].quantity - 1;

    } else {
        //nếu không thì xóa ra khỏi mảng
        cart.splice(i, 1);
    }
    save();
    location.reload();


}


//Hàm tính tổng hóa đơn
var $ = function(id) {
    return document.getElementById(id).value;
}

var order = function() {
    orderUser = {
        fname: $('#fname'),
        email: $('#emailUser'),
        address: $('#adr'),
        city: $('#city'),
        phone: $('#foned'),
        nameOnCard: $('#cname'),
        Creditcard: $('#ccnum'),
        month: $('#expmonth'),
        year: $('#expyear')
    }

    localStorage.setItem('orderUser', JSON.stringify(orderUser));
    if (cart.length != 0) {
        let sum = 0;
        for (let i in cart) {
            sum = sum + (cart[i].price * cart[i].quantity);
        }

        alert("Thank you for you order, your bill is:" + sum + " VND");
        Email.send({
            SecureToken: "921b4442-e2ed-4ec3-94bd-d2ee608d7801",
            From: 'trunghoangquan@gmail.com',
            To: orderUser.email,
            Subject: "Cảm ơn bạn đã tới nhà hàng của chúng tôi",
            Body: "ádhajsdhasid"

        }).then(
            message => alert("Gửi mail thành công")
        );

        cart = [];
        save();
        location.reload();
    } else {
        alert("Don't have any product in your cart");
    }

}