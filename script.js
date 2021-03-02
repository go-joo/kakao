var page=1;
getList();

$("#btnSearch").on("click", function(){
    page=1; getList();
});
$("#txtQuery").on("keydown", function(e){
    if(e.keyCode==13){
    getList();
    }
});
$("#selSize").on("change", function(){
    page=1; getList();
});
$("#btnpre").on("click", function(){
    page--; getList();
});
$("#btnNext").on("click", function(){
    page++; getList();
});
function getList(){
    var query=$("#txtQuery").val();
    var size=$("#selSize").val();
    $.ajax({
        type:"get",
        url: url,
        headers:{"Authorization":"KakaoAK 463f24beb99c64311e6fe49e904d4c26"},
        data:{"query":query,"size":size,"page":page},
        dataType:"json",
        success:function(data){
            var temp=Handlebars.compile($("#temp").html());
            $("#tbl").html(temp(data));

            var lastPage=Math.ceil(data.meta.pageable_count/size);
            $("#spanPage").html(page+"/"+ lastPage);
            if(page==1){
                $("#btnPre").attr("disalbled", ture);
            }else{
                $("#btnPre").attr("disalbled", false);
            }
            if(page==lastPage){
                $("#btnNext").attr("disalbled", ture);
            }else{
                $("#btnNext").attr("disalbled", false);
            }
        }
    });
}