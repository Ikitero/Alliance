//-------FrontEnd----------

var mobileMenu = document.getElementById("mobile-nav");
var backgroundBlur = document.getElementById("mobile-blur");
var mobileNav = document.getElementById("mobile-wrap");
var burger_line1 = document.getElementById("burger-line1");
var burger_line2 = document.getElementById("burger-line2");
var burger_line3 = document.getElementById("burger-line3");
var burger_line4 = document.getElementById("burger-line4");
var leftArrows = document.getElementById("left-arrows");
var rightArrows = document.getElementById("right-arrows");
var btnPrev = document.getElementById("button-prev");
var btnNext = document.getElementById("button-next");

var tender = document.getElementById("tender");
var tender_form = document.getElementById("popup-window");

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {
	37: 1,
	38: 1,
	39: 1,
	40: 1
};

function openMenu() {
	disableScrolling();
	if (mobileMenu.classList.contains("responsive")) {
		mobileMenu.classList.remove("responsive");
		burger_line1.classList.remove("disp-none");
		burger_line2.classList.remove("rot-45");
		burger_line3.classList.remove("rot--45");
		burger_line4.classList.remove("disp-none");
		enableScrolling();
	} else {
		mobileMenu.classList.add("responsive");
		burger_line1.classList.add("disp-none");
		burger_line2.classList.add("rot-45");
		burger_line3.classList.add("rot--45");
		burger_line4.classList.add("disp-none");
	}
	if (backgroundBlur.classList.contains("opac-show")) {
		backgroundBlur.classList.remove("opac-show");
	} else {
		backgroundBlur.classList.add("opac-show");
	}
	if (mobileNav.classList.contains("opac-show")) {
		mobileNav.classList.remove("opac-show");
	} else {
		mobileNav.classList.add("opac-show");
	}
}

function disableScrolling() {
	var x = window.scrollX;
	var y = window.scrollY;
	window.onscroll = function () {
		window.scrollTo(x, y);
	};
}

function enableScrolling() {
	window.onscroll = function () { };
}

function closeMenu(e) {
	if (e.target.classList.contains("navbar")) {
		return;
	}
	enableScrolling();
	mobileMenu.classList.remove("responsive");
	burger_line1.classList.remove("disp-none");
	burger_line2.classList.remove("rot-45");
	burger_line3.classList.remove("rot--45");
	burger_line4.classList.remove("disp-none");
	backgroundBlur.classList.remove("opac-show");
	mobileNav.classList.remove("opac-show");
}

function openTender(e) {
	disableScrolling();
	//document.body.classList.add("overflow");
	tender.classList.add("tender-active");
}

function closeTender(e) {
	if (e.target.className === "close" || e.target.className === "popup__blur") {
		enableScrolling();
		tender.classList.remove("tender-active");
	} else {
		return;
	}
}

function openRequest(e) {
	disableScrolling();
	request.classList.add("tender-active");
}

function closeRequest(e) {
	if (e.target.className === "close" || e.target.className === "popup__blur") {
		enableScrolling();
		request.classList.remove("tender-active");
	} else {
		return;
	}
}
function currentSlide() {
	if (btnPrev.classList.contains("swiper-button-disabled")) {
		document.getElementById("left-arrows").classList.add("disabled");
		document.getElementById("right-arrows").classList.remove("disabled");
	} else if (btnNext.classList.contains("swiper-button-disabled")) {
		document.getElementById("right-arrows").classList.add("disabled");
		document.getElementById("left-arrows").classList.remove("disabled");
	} else {
		document.getElementById("left-arrows").classList.remove("disabled");
		document.getElementById("right-arrows").classList.remove("disabled");
	}
}



//--------BackEnd-----------
function loadTemplate() {
    var t = document.getElementById("template");
    var s = new Object();
    s = t.options[t.selectedIndex].value;
    var url = '/Template/Load';
    $.ajax({
        type: 'post',
        url: url,
        data: { templateName: s },
        success: function (response) {
            var element = document.createElement('div');
            $(element).html(response).appendTo($("#UserContent"))
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    })

};

function castToObject(element) {
	var jsN = "{\"MainHeader\":null,\"SubHeader\":null,\"Category\":null,\"ShortDescription\":null,\"Description\":null,\"ImageUrl\":null,"
        + "\"DateCreated\":null,\"DateModified\":null,\"RegularPrice\":null,\"Slug\":\"null\"}"
    var obj = JSON.parse(jsN);

	obj.MainHeader = element.elements.namedItem("MainHeader") === null ? null : element.elements.namedItem("MainHeader").value;
	obj.SubHeader = element.elements.namedItem("SubHeader") === null ? null : element.elements.namedItem("SubHeader").value;
	obj.SubHeader = element.elements.namedItem("Category") === null ? null : element.elements.namedItem("Category").value;
    obj.ShortDescription = element.elements.namedItem("ShortDescription") === null ? null : element.elements.namedItem("ShortDescription").value;
    obj.Description = element.elements.namedItem("Description") === null ? null : element.elements.namedItem("Description").value;
	obj.RegularPrice = element.elements.namedItem("RegularPrice") === null ? null : element.elements.namedItem("RegularPrice").value;
	obj.Slug = element.elements.namedItem("Slug") === null ? null : element.elements.namedItem("Slug").value;
    obj.DateCreated = "0001-01-01T00:00:00";
    obj.DateModified = "0001-01-01T00:00:00";
    if (element.elements.namedItem("ImageUrl") !== null) {
        var tmp = [];
        for (var j = 0; j < element.elements.namedItem("ImageUrl").length; j++) {
            tmp.push(element.elements.namedItem("ImageUrl")[j].value);
        }
        obj.ImageUrl = tmp;
    }
    return obj;
}

function collectObjects() {
    var formsCollection = document.getElementsByTagName("form");
    var json = "[ ";
    for (i = 0; i < formsCollection.length; i++) {
        if (formsCollection[i].name !== "") {
            json += JSON.stringify(castToObject(formsCollection[i])) + ",";
        }
    }
    json = json.replace(/,\s*$/, "") + "]";

    var url = '/Template/Create';
    $.ajax({
        type: "post",
        url: url,
        data: { data: json },
        success: function (result) {
            window.location.href = result.url;
        },
        failure: function (response) {
            alert("Somthing went wrong! " + response.d);
        }
    })
};

$('#UserContent').on('click', 'a.remove_block', function (events) {
    $(this).parents('div').eq(1).remove();
});