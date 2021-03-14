// const API_URL = "https://600bd2f938fd25001702cbac.mockapi.io/api/b/";

const API_URL = "http://localhost:3000";

var room = [];
var product = [];
var user = [];
var discount = [];

var listImgRoom = [
    "../imgsRoom/room1.jpg",
    "../imgsRoom/room2.jpg",
    "../imgsRoom/room3.jpg",
    "../imgsRoom/room4.jpg",
    "../imgsRoom/room5.jpg",
    "../imgsRoom/room6.jpg"
]

function callAPI(endpoint, method = "GET", body) {
    return axios({
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}

function loadData() {
    callAPI('products', "GET", null).then((res) => {
        product = res.data;
        console.log(product);
        listWatch();
    });
    callAPI('rooms', "GET", null).then((res) => {
        room = res.data;
        console.log(room);
    });
    callAPI('users', "GET", null).then((res) => {
        user = res.data;
        console.log(user);
    });

    callAPI('discounts', "GET", null).then((res) => {
        discount = res.data;
        console.log(discount);
        productDiscount();
    })
    setTimeout(() => {
        displayRoom();
        postImg();
    }, 1000)
}
loadData();

function postImg() {
    for (let index = 1; index < listImgRoom.length; index++) {
        var body = room[index];
        body.img = listImgRoom[index];
        callAPI(`rooms/${index}`, "PUT", body);
    }
}



function displayRoom() {
    for (let i in room) {
        // var data = JSON.parse(JSON.stringify(room[i]))
        var prinf =
            ` <div class="col-12 col-sm-6 col-md-4 col-lg-3 p-4">										
            <div class="produre_box bg-white shadow-sm ">										
                <div class="image_box imgs">										
                    <img src="` + room[i].img + `" style="width:260px; height:200px;  border-radius:10px;">										
                </div>										
                    <div class="info_box p-3 bg-white ">										
                        <p class="float-left font-weight-bold mb-0 text-center" style="font-size: 70%">` + room[i].address + `</p>
                        <p class=" font-weight-bold mb-2  text-center" style="font-size: 70%;">` + room[i].price + `đ</p>									
                            <div style="clear: both;"></div>										
                                <div class="star_box float-left pt-2 btndetail">
                                    <div class="order_box float-right"  >										
                                        <button type="button" class="btn btn-primary col-sm-6" data-toggle="modal" data-target="#exampleModalLong2" onclick="getRoomVip(${i})">Detail</button>                                
                                        <button type="button" class="btn btn-primary col-sm-6" data-toggle="modal"  onclick="addProduct123(${i})">Add Cart</button>	 
                                    </div>	
                                    <div  class="modal fade mt-5" id="exampleModalLong2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" >										
                                        <div class="modal-dialog" role="diolog" style="width:30%; >										
                                            <div class="modal-content">										
                                                <div class="modal-body" style="background:rgb(199,226,78); ">										
                                                    <div id="printf_watch1234" >	
                                                    </div>										
                                                </div>										
                                            </div>										
                                        </div>										
                                    </div>										
                                </div>	                          														
                                <div style="clear: both;"></div>																				
                    </div>
            </div>										
        </div>`;
        document.getElementById("roomvip").innerHTML += prinf;

    }

}

displayRoom();
var getRoomVip = function(id) {
    let html = "";
    // let allRoom = JSON.parse(localStorage.getItem('listRoom'))
    let a = room[id];
    document.getElementById("printf_watch1234").innerHTML = `${html}         
    <div class="boxProduct" >
        <div class="box"> <img src="${a.img}" alt="" style="max-width:100% ;">
            <div class="box-heading">
                <h3 class="title">${a.address}</h3><span class="post"> ${a.price}đ</span>
            </div>
            <div class="boxContent">
                <p class="description text-center">${a.status}</p>
            </div>
        </div>
    </div>           
    `;
}