var prompt = require('prompt');
var download = require('download-file');
const unzip = require("unzip-crx");
var copydir = require('copy-dir');
prompt.start();
prompt.get(['url'], function (err, result) {
    console.log('Command-line input received:');
    if (result.url=='')
    { console.log('URL is empty'); }
    else
    { console.log('url: ' + result.url); }
    first_half_url=result.url;
    var url_player = first_half_url.concat("\\api\\public\\admin\\extensions\\player\\letznav_player.crx");
    var url_editor = first_half_url.concat("\\api\\public\\admin\\extensions\\editor\\letznav_editor.crx");
    var options_player = {
        directory: __dirname+'\\extensions\\player',
        filename: "letznav_player.crx",
    }
    var options_editor = {
        directory: __dirname+'\\extensions\\editor',
        filename: "letznav_editor.crx",  
     }
    const crxFile_player= __dirname+"\\extensions\\player\\letznav_player.crx";
    const crxFile_editor= __dirname+"\\extensions\\editor\\letznav_editor.crx";
    download(url_player, options_player, function(err_player){
        if (err_player) throw err_player
        console.log("Player downloaded");
        unzip(crxFile_player).then(() => {
        console.log("Successfully unzipped your player crx file..");
        copydir(__dirname+'\\extensions\\player\\letznav_player', 'D:\\LetzNav Default Extensions\\player\\letznav_player', function(err){
            if(err){
              console.log(err);
            } else {
              console.log('Copied Player');
            }
          });
        });     
});
 download(url_editor, options_editor, function(err_editor){
    if (err_editor) throw err_editor
    console.log("Editor downloaded")
    unzip(crxFile_editor).then(() => {
        console.log("Successfully unzipped your editor crx file..");
        copydir(__dirname+'\\extensions\\editor\\letznav_editor', 'D:\\LetzNav Default Extensions\\editor\\letznav_editor', function(err){
            if(err){
              console.log(err);
            } else {
              console.log('Copied Editor');
            }
          });
      });    
 });
});