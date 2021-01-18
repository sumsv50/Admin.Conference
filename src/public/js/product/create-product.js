var dt = new DataTransfer();
const fileInput = document.getElementById('fileInput');
const imgPreview = document.getElementById('imgPreview');
const nameImg = document.getElementById('nameImg');
const carouselImg = document.getElementById('carouselExampleIndicators');
const slideImg = document.querySelector('#slide-img');

var imgs = [];
var pStart = 0;

fileInput.addEventListener('change', () => {
    var files = fileInput.files;
    pStart = imgs.length;
    for (var i = 0; i < files.length; i++) {
        if (files[i].type) {
            if (files[i].type.split('/')[0] == 'image') {
                var src = URL.createObjectURL(files[i]);
                //Thêm trong view
                imgs.push({ src: src, name: files[i].name });
                //Thêm trong input file
                dt.items.add(files[i]);
            }
        }
    }
    if(pStart >= imgs.length) {
        pStart = imgs.length - 1;
    }
    fileInput.files = dt.files;
    generateImgs(imgs, pStart, template);
})



// Hàm phụ trợ khi xóa ảnh
generateImgs = function (imgs, pStart, template) {
    var imgHtml = template({ imgs, pStart });
    $('#carousel-place-holder').html(imgHtml);

    const btnDeleteImg = document.querySelector('#btnDeleteImg');

    btnDeleteImg.onclick = function () {
        var index = document.querySelector('.carousel-item.active').getAttribute("index");

        dt.items.remove(index);
        fileInput.files = dt.files;
        imgs.splice(index, 1);

        pStart = index >= imgs.length ? imgs.length - 1 : index;

        generateImgs(imgs, pStart, template);
    }
}