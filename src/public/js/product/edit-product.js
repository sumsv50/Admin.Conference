var updateImg  = function () {
    const fileInput = document.getElementById('fileInput');
    var pStart = 0;
    //Lưu số lượng ảnh ban đầu
    var number_old_books = imgs.length;

    var dt = new DataTransfer();
    const photos_remove = document.querySelector('#photos-remove');

     // Hàm phụ trợ khi xóa ảnh
    generateImgs = function(imgs, pStart, template) {
        var imgHtml = template({imgs, pStart});
    
        $('#carousel-place-holder').html(imgHtml);
    
        const btnDeleteImg = document.querySelector('#btnDeleteImg');
    
        btnDeleteImg.onclick = function () {
            var index = document.querySelector('.carousel-item.active').getAttribute("index");
            
    
            if(index-number_old_books >= 0){ //Nếu xóa ảnh mới thêm vào
                dt.items.remove([index-number_old_books]);
                fileInput.files = dt.files;
            }
            else {
                number_old_books--;
                if(!isNaN(imgs[index].index)) {
                    photos_remove.value += " " + imgs[index].index
                }
            }
            
            console.log(photos_remove.value);
            //Xóa ảnh trên giao diện
            console.log(fileInput.files);
            imgs.splice(index, 1);

            pStart = index >= imgs.length ? imgs.length - 1 : index;
        
            generateImgs(imgs, pStart, template);
        }

    }
    //Tạo view ban đầu
    generateImgs(imgs,pStart, template);

    fileInput.addEventListener('change', () => {
        var files = fileInput.files;
        var pStart = imgs.length;
        for(var i=0; i<files.length; i++) {
            if(files[i].type) {
                if(files[i].type.split('/')[0] == 'image') {
                    var src = URL.createObjectURL(files[i]);
                    //Thêm trong view
                    imgs.push({src: src, name: files[i].name});
                    //Thêm trong input file
                    dt.items.add(files[i]);
                }
            }
        }
        fileInput.files = dt.files;
        if(pStart >= imgs.length) {
            pStart = imgs.length - 1;
        }
    
        generateImgs(imgs, pStart, template);
    })



   
}
