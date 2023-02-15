
console.log('test log - script running')


$(document).ready(function() {
    $('#butt').click(function() {
        console.log("intro button clicked")
        $(this).hide("slow");
        $("#intro").hide("slow", function(){
            $("#main").show()
        });
    });
});