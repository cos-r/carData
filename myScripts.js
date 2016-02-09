//****************************************************************
google.load('visualization', '1');

var r_selYr;
var r_selMake;
var r_selModel;
var r_flg;
var r_selstr;

google.setOnLoadCallback(popYrDD);
google.setOnLoadCallback(popMakeDD);
google.setOnLoadCallback(popModelDD);

//****************************************************************
function popYrDD() {
  // Initialize Year DropDown
  var r_years = ['<select id="selectYear" onchange="dispYr();">','<option></option>'];

  // Construct query
  var query = "SELECT 'year' as Year " + 'FROM 1PlkMdqT1Y4Rfix0tnP4eMyF-WepipL_QArxoieTg';
            
  var queryText = encodeURIComponent(query);
  var gvizQuery = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText);

  // Send query and populate Year DropDown with data in response
  gvizQuery.send(function(response) {
    var numRows = response.getDataTable().getNumberOfRows();
    var numCols = response.getDataTable().getNumberOfColumns();

    // For each ROW get the first COLUMN (column 0)
    for (var i = 0; i < numRows; i++) {
      for(var j = 0; j < numCols; j++) {
        var yrValue = response.getDataTable().getValue(i, j);
        r_years.push('<option>' + yrValue + '</option>');
      }
    }
    
    // Close Year DropDown
    r_years.push('</select>');
    document.getElementById('r_years').innerHTML = r_years.join('');
  });
}

//****************************************************************
function popMakeDD() {
  // Initialize Make DropDown
  var r_makes = ['<select id="selectMake" onchange="dispMake();" disabled>','<option></option>'];

  // Construct query
  var query = "SELECT 'make' as Make, 'makeID' as MakeID " + 'FROM 1ty7l76yxMV27YJTBJpodxEw2zD97blhuWspUncY2';
            
  var queryText = encodeURIComponent(query);
  var gvizQuery = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText);

  // Send query and populate Make DropDown with data in response
  gvizQuery.send(function(response) {
    var numRows = response.getDataTable().getNumberOfRows();
    var numCols = response.getDataTable().getNumberOfColumns();

    // For each ROW get the first COLUMN (column 0)
    for (var i = 0; i < numRows; i++) {
        var makeValue0 = response.getDataTable().getValue(i, 0);
        var makeValue1 = response.getDataTable().getValue(i, 1);
        r_makes.push('<option value="' + makeValue1 + '">' + makeValue0 + '</option>');
    }
    
    // Close Make DropDown
    r_makes.push('</select>');
    document.getElementById('r_makes').innerHTML = r_makes.join('');
  });
}

//****************************************************************
function popModelDD() {
  // Initialize Model DropDown
  var r_models;
  
  document.getElementById("r_butt").disabled = true;
  
  // Check if it is Initial Load or coming from Make DD
  if (r_flg == 'X') {
    r_models = ['<select id="selectModel" onchange="dispModel();">','<option></option>'];
  } else {
    r_models = ['<select id="selectModel" onchange="dispModel();" disabled>','<option></option>'];  
  }
  
  // Retun if Initial Load and close Model DD
  if (r_selYr && r_selMake) {
  } else {
    r_models.push('</select>');
    document.getElementById('r_models').innerHTML = r_models.join('');
    return;
  }

  // Construct query
  var query = "SELECT 'model' as Model, 'modelID' as ModelID " + 'FROM 1tSg_wZF4mtvemPWCLSFaItNQ3f9qd4Miamb4TJEK' +
              " WHERE 'year' = " + r_selYr +
              " AND 'makeID' = " + r_selMake;

  var queryText = encodeURIComponent(query);
  var gvizQuery = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText);

  // Send query and populate Model DropDown with data in response
  gvizQuery.send(function(response) {
    var numRows = response.getDataTable().getNumberOfRows();
    var numCols = response.getDataTable().getNumberOfColumns();
    
    if (numRows === 0) {
      alert("ERROR: No Models found for Year/Make!");
    }
  
    // For each ROW get the first COLUMN (column 0)
    for (var i = 0; i < numRows; i++) {
        var modelValue0 = response.getDataTable().getValue(i, 0);
        var modelValue1 = response.getDataTable().getValue(i, 1);
        r_models.push('<option value="' + modelValue1 + '">' + modelValue0 + '</option>');
    }
    
    // Close Model DropDown
    r_models.push('</select>');
    document.getElementById('r_models').innerHTML = r_models.join('');
  });
}

//****************************************************************
function dispYr() {
  r_selYr = document.getElementById('selectYear').value;
  
  // Reset Make DD & Model DD & Disable Model DD
  document.getElementById("selectMake").value = '';
  document.getElementById("selectModel").value = '';
  document.getElementById("selectModel").disabled = true;
  document.getElementById("r_butt").disabled = true;
  
  // Disable Make DD if no Year is selected
  if (r_selYr) {
    document.getElementById("selectMake").disabled = false;
  } else {
    document.getElementById("selectMake").disabled = true;
  }
}

//****************************************************************
function dispMake() {
  r_selMake = document.getElementById('selectMake').value;

  // Enable Model DD and populate it
  if (r_selMake) {
    r_flg = 'X';
    popModelDD();
  } else {
    document.getElementById("r_butt").disabled = true;
    alert("ERROR: Select a Make!");
  }
}

//****************************************************************
function dispModel() {
  r_selModel = document.getElementById('selectModel').value;
  
  if (r_selModel) {
    // Enable search button
    document.getElementById("r_butt").disabled = false;
  } else {
    document.getElementById("r_butt").disabled = true;
    alert("ERROR: Select a Model!");
  }
}

//****************************************************************
function doSearch() {
  var txt_yr = document.getElementById("selectYear");
  var txt_mk = document.getElementById("selectMake");
  var txt_md = document.getElementById("selectModel");
  
  // Create URL
  r_selstr = "https://www.google.com/#q=" +
             txt_yr.options[txt_yr.selectedIndex].innerHTML + "+" +
             txt_mk.options[txt_mk.selectedIndex].innerHTML + "+" +
             txt_md.options[txt_md.selectedIndex].innerHTML;
  
  window.open(r_selstr);
}

//*E*N*D**********************************************************
