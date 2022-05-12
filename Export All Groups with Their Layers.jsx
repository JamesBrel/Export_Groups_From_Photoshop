function main() {
  var outputFolder = Folder.selectDialog("Select destination folder");
  var nameGroupList = [];

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

          SaveImage(
            outputFolder +
              "/" +
              nameGroupList[indexName] +
              "/" +
              layerName +
              ".png",
          );
          layersList[indexLayer].visible = false;
        }
      }
      groupsList[indexName].visible = false;
    }

    alert("The Export process is Done 😃", "Done");
    openFolder(outputFolder);
  }
}

function openFolder(_folderPath) {
  var folderCreated = new Folder(_folderPath);
  folderCreated.execute();
}

function SaveImage(_data) {
  var saveFile = File(_data);
  var sfwOptions = new ExportOptionsSaveForWeb();
  sfwOptions.format = SaveDocumentType.PNG;
  sfwOptions.PNG8 = false;
  sfwOptions.includeProfile = false;
  sfwOptions.transparency = true;
  sfwOptions.interlaced = 0;
  sfwOptions.quality = 100; //0-100
  activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, sfwOptions);
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

main();
