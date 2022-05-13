//* ---------------------- VARIABLES ----------------------
var outputFolder = Folder.selectDialog("Select destination folder");
var nameGroupList = [];
var operatingSystem = File.fs;

//* ---------------------- LOGIC CODE ----------------------
if (outputFolder !== null) {
  alert("The export will take a few minutes, so just wait 😉", "Waiting");
  var groupsList = app.activeDocument.layerSets;
  resetLayers(groupsList);

  for (var groupIndex = 0; groupIndex < groupsList.length; groupIndex++) {
    groupsList[groupIndex].visible = true;
    var nameGroup = groupsList[groupIndex].name;
    nameGroupList.push(nameGroup);
    createFolder(outputFolder + "/" + nameGroup + "/");
  }

  for (var indexName in nameGroupList) {
    groupsList[indexName].visible = true;
    var layersList = groupsList[indexName].layers;

    for (var indexLayer = 0; indexLayer < layersList.length; indexLayer++) {
      if (layersList[indexLayer].visible == false) {
        layersList[indexLayer].visible = true;
        var layerName = layersList[indexLayer].name;

        switch (operatingSystem) {
          case "Windows":
            windows(layerName, indexName);
            break;
          case "Macintosh":
            macintosh(layerName, indexName);
            break;
          case "Unix":
            unix(layerName, indexName);
            break;
          default:
            break;
        }

        layersList[indexLayer].visible = false;
      }
    }
    groupsList[indexName].visible = false;
  }

  alert("The Export process is Done 😃", "Done");
  openFolder(outputFolder);
}

//* ---------------------- FUNCTIONS ----------------------

function windows(_layerName, _indexName) {
  if (hasWhiteSpace(_layerName)) {
    var file = new File(
      outputFolder +
        "/" +
        nameGroupList[_indexName] +
        "/" +
        "temp_name" +
        ".png",
    );
    SaveImage(file);
    file.rename(_layerName + ".png");
  } else {
    var file = new File(
      outputFolder +
        "/" +
        nameGroupList[_indexName] +
        "/" +
        _layerName +
        ".png",
    );
    SaveImage(file);
  }
}

function macintosh(_layerName, _indexName) {
  if (filename.length > 27 && hasWhiteSpace(_layerName)) {
    var file = new File(
      outputFolder +
        "/" +
        nameGroupList[_indexName] +
        "/" +
        "temp_name" +
        ".png",
    );
    SaveImage(file);
    file.rename(_layerName + ".png");
  } else {
    var file = new File(
      outputFolder +
        "/" +
        nameGroupList[_indexName] +
        "/" +
        _layerName +
        ".png",
    );
    SaveImage(file);
  }
  //* --- Photoshop on Mac limits the length of a File object's file name to 31 characters --- .
}

function unix(_layerName, _indexName) {
  /**
   ** Ici tu ajoute les lignes de code qui géront le
   ** cas du système Unix..
   */
}

function hasWhiteSpace(_nameLayer) {
  return /\s/g.test(_nameLayer);
}

function openFolder(_folderPath) {
  var folderCreated = new Folder(_folderPath);
  folderCreated.execute();
}

function SaveImage(_file) {
  var sfwOptions = new ExportOptionsSaveForWeb();
  sfwOptions.format = SaveDocumentType.PNG;
  sfwOptions.PNG8 = false;
  sfwOptions.includeProfile = false;
  sfwOptions.transparency = true;
  sfwOptions.interlaced = false;
  sfwOptions.quality = 100; //0-100
  activeDocument.exportDocument(_file, ExportType.SAVEFORWEB, sfwOptions);
}

function resetLayers(_groups) {
  for (var i = 0; i < _groups.length; i++) {
    _groups[i].visible = false;
    for (var j = 0; j < _groups[i].layers.length; j++) {
      _groups[i].layers[j].visible = false;
    }
  }
}

function createFolder(_path) {
  var createFolder = new Folder(_path);
  if (!createFolder.exists) createFolder.create();
}
