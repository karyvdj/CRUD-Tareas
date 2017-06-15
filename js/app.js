var api = {
  url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var $tasksList = $("#tasks-list");
var $borrar = $(".borrar");
var $info = $(".info");

var cargarPagina = function () {
  cargarTareas();
  $("#add-form").submit(agregarTarea);
  $(document).on("click",$info,obtenerDatos);
  $(document).on("click",$borrar,borrarTarea);
};

var plantillaTarea = "<tr data-clave='__id__'>"+
          "<td>__nombre__</td>"+
          "<td>__estado__</td>"+
          "<td>"+
            "<a href='#'  class='info' data-toggle='modal' data-target='.bs-example-modal-sm'> <span class='glyphicon glyphicon-zoom-in'></span> </a>"+
            "<a href='#'> <span class='glyphicon glyphicon-pencil'></span> </a>"+
            "<a href='#'> <span class='glyphicon glyphicon-remove-circle borrar'></span> </a>"+
          "</td>"+
        "</tr>";

var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {
    tareas.forEach(crearTarea);

  });
};


var crearTarea = function (tarea) {
  var nombre = tarea.name;
  var estado = tarea.status[0];
  var id = tarea._id;
  var date = tarea.create_at;
  var $plantillaFinal = "";

  $plantillaFinal += plantillaTarea.replace("__nombre__", nombre)
  .replace("__estado__", estado)
  .replace("__id__", id);

  $tasksList.append($plantillaFinal);
};

var agregarTarea = function (e) {
  e.preventDefault();
  var nombre = $("#nombre-tarea").val();

  $.post(api.url, {name: nombre}, function (tarea) {
    crearTarea(tarea);
    $("#myModal").modal("hide");
  });
};

function borrarTarea(e){
  var elemento = $(e.target);
  var padre = elemento.parent().parent();

  // console.log(id);
  var id = padre.data('clave');
  padre.remove();

   var url_id = api.url + id;
   console.log(url_id);
  $.ajax({
    url: url_id,
    type: "DELETE",
    success: function (data){
      cargarTareas();
    }

  });
}

function obtenerDatos(e){
  var elemento = $(e.target);
  var padre = elemento.parent().parent();

  // console.log(id);
  var id = padre.data('clave');
  padre.remove();

   var url_id = api.url + id;
  $.getJSON(url_id,function(response){
    console.log(response);

    var nombre_api = response.name;
    var _id = response._id;
    var date = response.created_at;
    var status = response.status[0];
    console.log(nombre_api, _id, date, status);

    imprimirInfo({
      nombre: nombre_api,
      clave: _id,
      date: date,
      status: status
    })

  })

}

function imprimirInfo(objeto){
  var $nombre = $("#nombre");
  var $id = $("#id");
  var $fecha = $("#fecha");
  var $estado = $("#estado");

  $nombre.text(objeto.nombre);
  $id.text(objeto.clave);
  $fecha.text(objeto.date);
  $estado.text(objeto.status);

}

$(document).ready(cargarPagina);
