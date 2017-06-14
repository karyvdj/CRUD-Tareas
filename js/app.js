var api = {
  url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var $tasksList = $("#tasks-list");
var $plantillaFinal = "";

var cargarPagina = function () {
  cargarTareas();
  $("#add-form").submit(agregarTarea);
};

var plantillaTarea = "<tr>"+
          "<td>__nombre__</td>"+
          "<td>__estado__</td>"+
          "<td>"+
            "<a href='#' data-toggle='modal' data-target='.bs-example-modal-sm'> <span class='glyphicon glyphicon-zoom-in'></span> </a>"+
            "<a href='#'> <span class='glyphicon glyphicon-pencil'></span> </a>"+
            "<a href='#'> <span class='glyphicon glyphicon-remove-circle'></span> </a>"+
          "</td>"+
        "</tr>";

var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {
    tareas.forEach(crearTarea);
    $("#tasks-list").html($plantillaFinal);
  });
};


var crearTarea = function (tarea) {
  $plantillaFinal += plantillaTarea.replace("__nombre__", tarea.name)
  .replace("__estado__", tarea.status)
};

var agregarTarea = function (e) {
  e.preventDefault();
  var nombre = $("#nombre-tarea").val();
  $.post(api.url, {
    name: nombre
  }, function (tarea) {
    crearTarea(tarea);
    $("#myModal").modal("hide");
  });
};

$(document).ready(cargarPagina);
