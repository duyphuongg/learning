
// $('form#csv_import_reviews').submit(function(e) {
//     e.preventDefault();
//     var formData = new FormData($(this)[0]);
//     formData.append('shop_id' ,'');
//     formData.append('product_id' ,'');
//     formData.append('type' ,'');
//     // param  csv setting example
//     var myCsvSettingArray = {key1: 'bla', key2: 'blubb'};
//     jQuery.each(myCsvSettingArray, function(key, value) {
//         formData.append('csv_setting['+key+']', value);
//     });

//     $.ajax({
//         headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
//         url: appUrl + "/csv/import",
//         type: 'POST',
//         data:formData,
//         dataType:'JSON',
//         contentType: false,
//         cache: false,
//         processData: false,
//         success: function(msg) {
//           console.log(msg); 
//         }
//     });
// });

