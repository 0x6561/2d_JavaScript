window.onload = add_input_txt;

const DELAY = 400;
const CA_GEN= 10;
var world_array;

function add_input_txt(){
  let txt_dv = document.createElement("div");
  txt_dv.setAttribute('id', 'txt_div');

  let pg = document.createElement("p");
  pg.setAttribute('id', 'pg');

  let msg = "2 dimensional ALgorithm Demo \n";
  msg += " Enter size for square grid, for example 100 for a 100X100 grid."

  let txt_node = document.createTextNode(msg);
  pg.appendChild(txt_node);

  let tf = document.createElement("input");
  tf.setAttribute('id',"itf");
  tf.setAttribute('type',"text");

  let b = document.createElement("button");

  b.setAttribute('onclick', 'create_grid()');
  b.innerHTML = 'Create Grid';

  document.getElementsByTagName('body')[0].appendChild(txt_dv);
  document.getElementById('txt_div').appendChild(pg);
  document.getElementById('txt_div').appendChild(tf);
  document.getElementById('txt_div').appendChild(b);
}

function add_alg_choice_div(){
  let alg_fldset = document.createElement("fieldset");
  alg_fldset.setAttribute('id', 'alg_fldset');
  let alg_legend = document.createElement("legend");
  alg_legend.innerHTML = "Choose an Algorithm to continue..";

  let flood_div = document.createElement("div");
  flood_div.setAttribute('id', 'flood_div');
  let radio_flood = document.createElement("input");
  radio_flood.setAttribute("type", "radio");
  radio_flood.setAttribute("id", "radio_flood");
  radio_flood.setAttribute("name", "radio_algs");
  radio_flood.setAttribute("value", "flood fill");
  radio_flood.onclick = function(){
    add_flood_fill_div();
    set_alg(flood_fill_help);
  }
  let radio_lbl_flood = document.createElement('label');
  radio_lbl_flood.setAttribute('for', "radio_flood");
  radio_lbl_flood.innerHTML = "Flood Fill";
  flood_div.appendChild(radio_flood);
  flood_div.appendChild(radio_lbl_flood);

  let ca_div = document.createElement("div");
  ca_div.setAttribute('id', 'ca_div');
  let radio_ca = document.createElement("input");
  radio_ca.setAttribute("type", "radio");
  radio_ca.setAttribute("id", "radio_ca");
  radio_ca.setAttribute("name", "radio_algs");
  radio_ca.setAttribute("value", "Cellular Automata");
  radio_ca.onclick = function(){
    add_ca_div();
    set_alg(cellular_automata_helper);
  }
  let radio_lbl_ca = document.createElement('label');
  radio_lbl_ca.setAttribute('for', "radio_ca");
  radio_lbl_ca.innerHTML = "Cellular Automata";
  ca_div.appendChild(radio_ca);
  ca_div.appendChild(radio_lbl_ca);

  document.getElementsByTagName('body')[0].appendChild(alg_fldset);
  document.getElementById('alg_fldset').appendChild(alg_legend);
  document.getElementById('alg_fldset').appendChild(flood_div);
  document.getElementById('alg_fldset').appendChild(ca_div);
}

function add_flood_fill_div(){
  document.getElementById("alg_fldset").style.display = 'none';           // Hide
  let flood_fldset = document.createElement("fieldset");
  flood_fldset.setAttribute('id', 'flood_fldset');
  let flood_legend = document.createElement("legend");
  flood_legend.innerHTML = "Choose settings and press the spacebar to continue..";

  let flood_div = document.createElement("div");
  flood_div.setAttribute('id', 'flood_div');
  let radio_flood = document.createElement("input");
  radio_flood.setAttribute("type", "radio");
  radio_flood.setAttribute("id", "radio_flood");
  radio_flood.setAttribute("name", "radio_floods");
  radio_flood.setAttribute("value", "flood fill");
  let radio_lbl_flood = document.createElement('label');
  radio_lbl_flood.setAttribute('for', "radio_flood");
  radio_lbl_flood.innerHTML = "Simple Flood Fill";
  flood_div.appendChild(radio_flood);
  flood_div.appendChild(radio_lbl_flood);

  let shape_fill_div = document.createElement("div");
  shape_fill_div.setAttribute('id', 'shape_fill_div');
  let radio_shape_fill = document.createElement("input");
  radio_shape_fill.setAttribute("type", "radio");
  radio_shape_fill.setAttribute("id", "radio_shape_fill");
  radio_shape_fill.setAttribute("name", "radio_floods");
  radio_shape_fill.setAttribute("value", "Shape Fill");
  let radio_lbl_shape_fill = document.createElement('label');
  radio_lbl_shape_fill.setAttribute('for', "radio_shape_fill");
  radio_lbl_shape_fill.innerHTML = "Shape Fill";
  shape_fill_div.appendChild(radio_shape_fill);
  shape_fill_div.appendChild(radio_lbl_shape_fill);

  document.getElementsByTagName('body')[0].appendChild(flood_fldset);
  document.getElementById('flood_fldset').appendChild(flood_legend);
  document.getElementById('flood_fldset').appendChild(add_direction_div());
  document.getElementById('flood_fldset').appendChild(flood_div);
  document.getElementById('flood_fldset').appendChild(shape_fill_div);
}

function add_ca_div(){
  document.getElementById("alg_fldset").style.display = 'none';           // Hide 
  let ca_fldset = document.createElement("fieldset");
  ca_fldset.setAttribute('id', 'ca_fldset');
  let ca_legend = document.createElement("legend");
  ca_legend.innerHTML = "Choose settings and press the spacebar to continue..";

  let ca_auto_div = document.createElement("div");
  ca_auto_div.setAttribute('id', 'ca_div');
  let radio_ca_auto = document.createElement("input");
  radio_ca_auto.setAttribute("type", "radio");
  radio_ca_auto.setAttribute("id", "radio_ca_auto");
  radio_ca_auto.setAttribute("name", "radio_cas");
  radio_ca_auto.setAttribute("value", "Auto");
  let radio_lbl_ca_auto = document.createElement('label');
  radio_lbl_ca_auto.setAttribute('for', "radio_ca_auto");
  radio_lbl_ca_auto.innerHTML = "Auto";
  ca_auto_div.appendChild(radio_ca_auto);
  ca_auto_div.appendChild(radio_lbl_ca_auto);

  let ca_manual_div = document.createElement("div");
  ca_manual_div.setAttribute('id', 'ca_manual_div');
  let radio_ca_manual = document.createElement("input");
  radio_ca_manual.setAttribute("type", "radio");
  radio_ca_manual.setAttribute("id", "radio_ca_manual");
  radio_ca_manual.setAttribute("name", "radio_cas");
  radio_ca_manual.setAttribute("value", "Manual");
  let radio_lbl_ca_manual = document.createElement('label');
  radio_lbl_ca_manual.setAttribute('for', "radio_ca_manual");
  radio_lbl_ca_manual.innerHTML = " Manual ";
  ca_manual_div.appendChild(radio_ca_manual);
  ca_manual_div.appendChild(radio_lbl_ca_manual);

  document.getElementsByTagName('body')[0].appendChild(ca_fldset);
  document.getElementById('ca_fldset').appendChild(ca_legend);
  //document.getElementById('ca_fldset').appendChild(add_direction_div());
  document.getElementById('ca_fldset').appendChild(ca_auto_div);
  document.getElementById('ca_fldset').appendChild(ca_manual_div);
}

function add_direction_div(){
  let direction_div = document.createElement("div");
  direction_div.setAttribute('id', 'direction_div');
  let radio_dir_4 = document.createElement("input");
  radio_dir_4.setAttribute("type", "radio");
  radio_dir_4.setAttribute("id", "radio_dir_4");
  radio_dir_4.setAttribute("name", "radio_directions");
  radio_dir_4.setAttribute("value", "4 way flood fill");
  let radio_lbl_dir_4 = document.createElement('label');
  radio_lbl_dir_4.setAttribute('for', "radio_directions");
  radio_lbl_dir_4.innerHTML = " 4 Way Flood Fill  ";

  let radio_dir_8 = document.createElement("input");
  radio_dir_8.setAttribute("type", "radio");
  radio_dir_8.setAttribute("id", "radio_dir_8");
  radio_dir_8.setAttribute("name", "radio_directions");
  radio_dir_8.setAttribute("value", "8 way flood fill");
  let radio_lbl_dir_8 = document.createElement('label');
  radio_lbl_dir_8.setAttribute('for', "radio_dir_8");
  radio_lbl_dir_8.innerHTML = "8 Way Flood Fill";
  direction_div.appendChild(radio_dir_8);
  direction_div.appendChild(radio_lbl_dir_8);
  direction_div.appendChild(radio_dir_4);
  direction_div.appendChild(radio_lbl_dir_4);
  direction_div.appendChild(radio_dir_8);
  direction_div.appendChild(radio_lbl_dir_8);
  return direction_div;
}

function create_grid()
{
  document.getElementById("txt_div").style.display = 'none';           // Hide
  let txt = document.getElementById('itf').value;
  //console.log("button pressed " + parseInt(txt)) ;
  let num = parseInt(txt);
  if(!num)
  {
    num = 10;
  }
  world_array = create2dArray(num);
  init2dArray(world_array, 0);
  add_grid(num);
  add_alg_choice_div();
}

function XY_coord(x_coord, y_coord){
  this.x = x_coord;
  this.y = y_coord;
}

function create2dArray(size_x, size_y = size_x, init_val = 0){
  var arr2d = new Array(size_x);
  for (var i = 0; i < size_x; i++) {
    arr2d[i] = new Array(size_y);
  }
  for (let i = 0; i < arr2d.length; i++) 
  {
    for (let j = 0; j < arr2d[i].length; j++) 
    {
      arr2d[i][j] = init_val;
    }
  }
  return arr2d;
}

function init2dArray(arr, init_val = 0){
  for (let i = 0; i < arr.length; i++) 
  {
    for (let j = 0; j < arr[i].length; j++) 
    {
      arr[i][j] = init_val;
    }
  }
  //return arr;
}

function modify2dArray(arr, x, y, new_value){
  arr[x][y] = new_value;
}

function add_grid(num){
  let tbl_div = document.createElement("div");
  tbl_div.setAttribute('id', 'tbl_div');
  document.getElementsByTagName('body')[0].appendChild(tbl_div);

  let tbl_pg = document.createElement("p");
  tbl_pg.setAttribute('id', 'tbl_pg');

  let tbl_msg = "Select cells, when done select algorithm..";
  let tbl_node = document.createTextNode(tbl_msg);
  tbl_pg.appendChild(tbl_node);

  let tbl  = document.createElement("table");
  tbl.setAttribute('id',"tbl");
  tbl.setAttribute('class',"grid_table");
  document.getElementById('tbl_div').appendChild(tbl_pg);
  document.getElementById('tbl_div').appendChild(tbl);

  for(let y = num-1; y >= 0; y--)
  {
    let row = document.createElement("tr");
    for(let x = 0; x < num; x++){
      let cell_id = "x" + x + ":y" + y;
      let cell = document.createElement("td");
      cell.setAttribute('id', cell_id);
      cell.setAttribute('class', "unselected");
      cell.addEventListener("click", mark_node);
      //let cellText = document.createTextNode(cell_id);
      ////cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tbl.appendChild(row);
  }
}

function modify_grid(arr2d){
  let tbl  = document.getElementById("tbl");
  for(let y = arr2d.length-1; y >= 0; y--)
  {
    for(let x = 0; x < arr2d[y].length; x++){
      let cell_id = "x" + x + ":y" + y;
      let cell = document.getElementById(cell_id);
      if(arr2d[x][y]){
      cell.setAttribute('class', "selected_white");
        setTimeout(function(){
      cell.setAttribute('class', "selected_yellow");
        }, DELAY/2);
        setTimeout(function(){
      cell.setAttribute('class', "selected");
        }, DELAY/3);
      }else{
      cell.setAttribute('class', "unselected");
      }
    }
  }
}

function mark_node(){
  let c_id = this.id;
  let coords = get_world_array(c_id);
  let td_class = this.getAttribute("class");

  if(td_class === "unselected"){
    this.setAttribute('class', "selected");
    modify2dArray(world_array, coords[0], coords[1], 1);
  }else{
    this.setAttribute('class', "unselected");
    modify2dArray(world_array, coords[0], coords[1], 0);
  }
}

function mark_node_basic(coords, new_val = 0){
  let cell_id = "x" + coords[0] + ":y" + coords[1];
  let tgt_cell = document.getElementById(cell_id);
  if(new_val === 0){
    tgt_cell.setAttribute('class', "unselected");
    modify2dArray(world_array, coords[0], coords[1], new_val);
  }else{
    tgt_cell.setAttribute('class', "selected");
    modify2dArray(world_array, coords[0], coords[1], new_val);
  }
}

function mark_node_color(coords, new_val = 0){
  let cell_id = "x" + coords[0] + ":y" + coords[1];
  let tgt_cell = document.getElementById(cell_id);
  switch(new_val){
    case 0:
      tgt_cell.setAttribute('class', "unselected");
      modify2dArray(world_array, coords[0], coords[1], new_val);
      break;
    case 1:
      tgt_cell.setAttribute('class', "selected");
      modify2dArray(world_array, coords[0], coords[1], new_val);
      break;
    case 2:
      tgt_cell.setAttribute('class', "selected_white");
      modify2dArray(world_array, coords[0], coords[1], new_val);
      break;
    case 3:
      tgt_cell.setAttribute('class', "selected_yellow");
      modify2dArray(world_array, coords[0], coords[1], new_val);
      break;
    case 4:
      tgt_cell.setAttribute('class', "selected_green");
      modify2dArray(world_array, coords[0], coords[1], new_val);
      break;
    case 5:
      tgt_cell.setAttribute('class', "selected_blue");
      modify2dArray(world_array, coords[0], coords[1], new_val);
      break;
    case 6:
      tgt_cell.setAttribute('class', "selected_purple");
      modify2dArray(world_array, coords[0], coords[1], new_val);
      break;
    case 7:
      tgt_cell.setAttribute('class', "selected_red");
      modify2dArray(world_array, coords[0], coords[1], new_val);
      break;
    case 8:
      tgt_cell.setAttribute('class', "selected_brown");
      modify2dArray(world_array, coords[0], coords[1], new_val);
      break;
    default:
      console.log("doh ?");
  }
}

function get_world_array(str){
  let world_array = [];
  world_array = str.match(/\d+/g);
  //console.log("world_array : " + world_array);
  return world_array;
}

function set_alg(alg){
  window.addEventListener("keyup", event => {
    console.log(event.key);
    if (event.key == " ") {
      alg();
    }
  })
}

function flood_fill_help(){
  if(is_Shape_Fill()){
    flood_fill(world_array, 0, 0, 0, 5, is_8way());
    let tgt_found = false;
    let tgt = [];
    for(let x = 0;!tgt_found && x < world_array.length;x++){
    for(let y = 0;!tgt_found && y < world_array[x].length;y++){
        console.log("looking at: x: " + x + " y: " + y + " ==  " + world_array[x][y]);
        if(world_array[x][y] == 0){
          console.log("FOUND THE HOlE!");
          //mark_node_color([x,y], 7);
          tgt_found = true;
          flood_fill(world_array, x, y, 0, 4, is_8way());
          break;
        }
      }
    }
    flood_fill_slow(world_array, 0, 0, 5, 0, is_8way());
  }else{
  flood_fill_slow(world_array, 0, 0, 0, 5, is_8way());
}}

function flood_fill(arr, x, y, target = 0, replacement =1, eight_way = true){
    if((x < 0) || (y < 0) || (x >= arr.length) || (y >= arr[x].length))
    { 
      return;
    }

    if(target == replacement){
      return;;
    }

    if(arr[x][y] == replacement){
      return;
    }

    if (arr[x][y] != target){
      return;;
    }

    if(arr[x][y] == target){
      //arr[x][y] = replacement;
      //let tgt_cell = document.getElementById("x" + x + ":y" + y);
      //tgt_cell.setAttribute("class", "selected2");
      mark_node_color([x,y], replacement);
    }
    /*
     *   x-1,y+1  x,y+1 x+1,y+1  
     *   x-1,y      x   x+1,y  
     *   x-1,y-1  x,y-1 x+1,y-1    
     */
    //west
    flood_fill(arr, (x + 1), y, target, replacement, eight_way);
    //north
    flood_fill(arr,x , (y + 1), target, replacement, eight_way);
    //east
    flood_fill(arr, (x - 1), y, target, replacement, eight_way);
    //south
    flood_fill(arr, x, (y - 1), target, replacement, eight_way);

    if(eight_way){
      //north west
      flood_fill(arr, (x + 1), (y + 1), target, replacement, eight_way);
      //north east
      flood_fill(arr, (x - 1), (y + 1), target, replacement, eight_way);
      //south east
      flood_fill(arr, (x + 1), (y - 1), target, replacement, eight_way);
      //south west
      flood_fill(arr, (x - 1), (y - 1), target, replacement, eight_way);
    }
}

function flood_fill_slow(arr, x, y, target = 0, replacement =1, eight_way = true){
  setTimeout(function(){
    if((x < 0) || (y < 0) || (x >= arr.length) || (y >= arr[x].length))
    { 
      return;
    }

    if(target == replacement){
      return;;
    }

    if(arr[x][y] == replacement){
      return;
    }

    if (arr[x][y] != target){
      return;;
    }

    if(arr[x][y] == target){
      //arr[x][y] = replacement;
      //let tgt_cell = document.getElementById("x" + x + ":y" + y);
      //tgt_cell.setAttribute("class", "selected2");
      mark_node_color([x,y], replacement);
    }
    /*
     *   x-1,y+1  x,y+1 x+1,y+1  
     *   x-1,y      x   x+1,y  
     *   x-1,y-1  x,y-1 x+1,y-1    
     */
    //west
    flood_fill(arr, (x + 1), y, target, replacement, eight_way);
    //north
    flood_fill(arr,x , (y + 1), target, replacement, eight_way);
    //east
    flood_fill(arr, (x - 1), y, target, replacement, eight_way);
    //south
    flood_fill(arr, x, (y - 1), target, replacement, eight_way);

    if(eight_way){
      //north west
      flood_fill(arr, (x + 1), (y + 1), target, replacement, eight_way);
      //north east
      flood_fill(arr, (x - 1), (y + 1), target, replacement, eight_way);
      //south east
      flood_fill(arr, (x + 1), (y - 1), target, replacement, eight_way);
      //south west
      flood_fill(arr, (x - 1), (y - 1), target, replacement, eight_way);
    }
  }, DELAY/4);
}

function cellular_automata_helper(){
  if(is_Auto()){
    var interval = window.setInterval(function(){
      cellular_automata();
    }, DELAY);
    document.onkeypress = function(key){
      if(key.key == 'q'){
        window.clearInterval(interval);
      }
    };
  }else{
    cellular_automata();
  }
}

function cellular_automata(target = false){
  let live_cells = [];
  for(let i = 0; i < world_array.length; i++){
    for(let j = 0; j < world_array[i].length; j++){
      let cell_ct = has_neighbors(world_array, [i, j]).reduce((a,b) => a + b);
      if(world_array[i][j]){
        if((cell_ct ==  2) || (cell_ct == 3)){
          live_cells.push([i, j]);
        }
      }else{
        if(cell_ct == 3){
          live_cells.push([i, j]);
        }
      }
    }
  }
  init2dArray(world_array, 0);
  for(let cell of live_cells){
    world_array[cell[0]][cell[1]] = 1;
  }
  modify_grid(world_array);
}

function is_Auto(){
  let isAuto = document.getElementById('radio_ca_auto');
  let auto = false;
  if(isAuto.checked){
    auto = true;
  }
  return auto;
}

function is_8way(){
  let direction = document.getElementById('radio_dir_8');
  let dir = false;
  if(direction.checked){
    dir = true;
  }
  return dir;
}
 
function is_Shape_Fill(){
  let isShapeFill = document.getElementById('radio_shape_fill');
  let shape = false;
  if(isShapeFill.checked){
    shape = true;
  }
  return shape;
}

function find_nodes(arr, target = true){
  //find cells
  let target_cells = [];
  for(let i = 0; i < arr.length; i++){
    for(let j = 0; j < arr[i].length; j++){
        console.log("looking at: " + i + " " + j);
      if(arr[i][j] == target){
        target_cells.push([i,j]);
      }
    }
  }
  return target_cells;
}

function has_neighbors(arr, world_arraycoords, target = 1, eightway = true){
   /*  x-1,y+1  x,y+1 x+1,y+1  
   *   x-1,y      x   x+1,y  
  let x = world_arraycoords[0];
  let y = world_arraycoords[1];
   *   x-1,y-1  x,y-1 x+1,y-1    
   */

  // [top-left: 0,
  // top: 1,
  // top-right: 2,
  // left: 3,
  // right: 4,
  // bottom-left: 5,
  // bottom: 6,
  // bottom-right: 7]
  let neighbors = [0, 0, 0, 0, 0, 0, 0, 0];
  
  if(look_left(arr, world_arraycoords, target)){
    neighbors[3] = 1;
  }
  if(look_top(arr, world_arraycoords, target)){
    neighbors[1] = 1;
  }
  if(look_right(arr, world_arraycoords, target)){
    neighbors[4] = 1;
  }
  if(look_bottom(arr, world_arraycoords, target)){
    neighbors[6] = 1;
  }
  if(eightway){
  if(look_top_left(arr, world_arraycoords, target)){
    neighbors[0] = 1;
  }
  if(look_top_right(arr, world_arraycoords, target)){
    neighbors[2] = 1;
  }
  if(look_bottom_left(arr, world_arraycoords, target)){
    neighbors[5] = 1;
  }
  if(look_bottom_right(arr, world_arraycoords, target)){
    neighbors[7] = 1;
  }
  }
return neighbors;
}

function look_top(arr, coords, target){
  let found = false;
  let x = coords[0];
  let y = coords[1];
  if((y + 1) >= arr[x].length){y = -1;}
  if(arr[x][y+1] === target){
    found = true;
  }
  return found;
}
function look_left(arr, coords, target){
  let found = false;
  let x = coords[0];
  let y = coords[1];
  if((x - 1) < 0){x = arr.length;}
  if(arr[x-1][y] === target){
    found = true;
  }
  return found;
}
function look_right(arr, coords, target){
  let found = false;
  let x = coords[0];
  let y = coords[1];
  if((x + 1) >= arr.length){x = -1;}
  if(arr[x + 1][y] === target){
    found = true;
  }
  return found;
}
function look_bottom(arr, coords, target){
  let found = false;
  let x = coords[0];
  let y = coords[1];
  if((y - 1) < 0){y = arr[x].length;}
  if(arr[x][y-1] === target){
    found = true;
  }
  return found;
}
function look_top_left(arr, coords, target){
  let found = false;
  let x = coords[0];
  let y = coords[1];
  if((y + 1) >= arr[x].length){y = -1;}
  if((x - 1) < 0){x = arr.length;}
  if(arr[x-1][y+1] === target){
    found = true;
  }
  return found;
}
function look_top_right(arr, coords, target){
  let found = false;
  let x = coords[0];
  let y = coords[1];
  if((y + 1) >= arr[x].length){y = -1;}
  if((x + 1) >= arr.length){x = -1;}
  if(arr[x + 1][y + 1] === target){
    found = true;
  }
  return found;
}
function look_bottom_left(arr, coords, target){
  let found = false;
  let x = coords[0];
  let y = coords[1];
  if((y - 1) < 0){y = arr[x].length;}
  if((x - 1) < 0){x = arr.length;}
  if(arr[x - 1][y - 1] === target){
    found = true;
  }
  return found;
}
function look_bottom_right(arr, coords, target){
  let found = false;
  let x = coords[0];
  let y = coords[1];
  if((y - 1) < 0){y = arr[x].length;}
  if((x + 1) >= arr.length){x = -1;}
  if(arr[x + 1][y-1] === target){
    found = true;
  }
  return found;
}


