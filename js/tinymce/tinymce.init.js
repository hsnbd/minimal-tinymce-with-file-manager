tinymce.init({
    selector: "#tinymce",
    menubar:false,
    statusbar: true,
    paste_as_text: true,
    theme: "modern",
    plugins: [
        "advlist autolink link image lists charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars insertdatetime media nonbreaking",
        "table contextmenu directionality emoticons paste textcolor code"
    ],
    toolbar1: "imageupload undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | styleselect | link  | image media | forecolor backcolor  | print preview ",
    // image_advtab: true ,
    setup: function(editor) {
        var inp = $('<input id="tinymce-uploader" type="file" name="file" accept="image/*" style="display:none">');
        $(editor.getElement()).parent().append(inp);
        inp.on("change",function(){
            var input = inp.get(0);
            var file = input.files[0];
            var form_data = new FormData();
            form_data.append('file', file);
            inp.val(''); //reset request
            $.ajax({
                url: 'http://tinymcecustomized.cf/postAcceptor.php', // point to server-side PHP script
                dataType: 'text', // what to expect back from the PHP script
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function (response) {
                    var msg = JSON.parse(response);
                    if(msg.status){
                        editor.insertContent('<img src="http://tinymcecustomized.cf/images/'+file.name+'"/>');
                    }
                    if(msg.errors){
                        editor.insertContent(msg.errors);
                    }
                },
                error: function (response) {
                    editor.insertContent('something wrong!!!');
                }
            });
        });
        editor.addButton( 'imageupload', {
            text:"ImageInsert",
            icon: true,
            onclick: function(e) {
                inp.trigger('click');
            }
        });
    }
});
