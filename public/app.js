$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
      $("#articlesDisplay").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });
  
  $(document).on("click", "p", function() {
    $("#notesDisplay").empty();
    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function(data) {
        console.log(data);
        $("#notesDisplay").append("<h2>" + data.title + "</h2>");
        $("#notesDisplay").append("<input id='titleinput' name='title' >");
        $("#notesDisplay").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#notesDisplay").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        if (data.note) {
          $("#titleinput").val(data.note.title);
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  

  $(document).on("click", "#savenote", function() {
    var thisId = $(this).attr("data-id");

    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    })
      .then(function(data) {
        console.log(data);
        $("#notesDisplay").empty();
      });
  
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  