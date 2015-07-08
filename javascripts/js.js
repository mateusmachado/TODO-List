$(function(){
  var $lastClicked;

  function onClickDeleteTask() {

    $(this).parent('.task-item')
      .off('click')
      .hide('slow', function() {
        $(this).remove();
      });
  }

  function addtask(text) {
    var $task = $("<div />")
                  .addClass("task-item")
                  .append($("<div />")
                          .addClass("task-text")
                          .text(text))
                  .append($("<div />")
                          .addClass("task-delete"))
                  .append($("<div />")
                          .addClass("clear"));

    $("#task-list").append($task);
    $(".task-delete").click(onClickDeleteTask);
    $(".task-item").click(ontaskItemClick);
  }

  function ontaskKeydown(event) {
    if(event.which === 13) {
      addtask($("#task").val());
      $("#task").val("");
    }
  }

  function ontaskEditKeydown(event) {
    if(event.which === 13) {
      savePendingEdition($lastClicked);
      $lastClicked = undefined;
    }
  }

  function ontaskItemClick(){

    if(!$(this).is($lastClicked)) {
      if($lastClicked !== undefined) {
        savePendingEdition($lastClicked);
      }

      $lastClicked = $(this);

      var text = $lastClicked.children('.task-text').text();

      var content = "<input type='text' class='task-edit' value='" + 
        text + "'>";

      $lastClicked.html(content);

      $(".task-edit").keydown(ontaskEditKeydown);
    }
  
  }

  function savePendingEdition($task) {
    var text = $task.children('.task-edit').val();
    $task.empty();
    $task.append("<div class='task-text'>" + text + "</div>")
          .append("<div class='task-delete'></div>")
          .append("<div class='clear'></div>");

    $(".task-delete").click(onClickDeleteTask);

    $task.click(ontaskItemClick);
  }

  $(".task-delete").click(onClickDeleteTask);
  $(".task-item").click(ontaskItemClick);
  $("#task").keydown(ontaskKeydown);
});