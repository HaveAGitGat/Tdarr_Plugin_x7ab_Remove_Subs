


function details() {

  return {
    id: "Tdarr_Plugin_x7ab_Remove_Subs",
    Name: "Tdarr_Plugin_x7ab_Remove_Subs ",
    Type: "Video",
    Description: `This plugin removes subs. The output container is the same as the original. \n\n`,
    Version: "1.00",
    Link: "https://github.com/HaveAGitGat/Tdarr_Plugin_x7ab_Remove_Subs"
  }

}

function plugin(file) {


  //Must return this object

  var response = {

     processFile : false,
     preset : '',
     container : '.mp4',
     handBrakeMode : false,
     FFmpegMode : false,
     reQueueAfter : false,
     infoLog : '',

  }

  



  if (file.fileMedium !== "video") {

    console.log("File is not video")

    response.infoLog += " File is not video"
    response.processFile = false;

    return response

  } else { 


    response.FFmpegMode = true
    response.container = '.' + file.container

     var hasSubs = false

     for (var i = 0; i < file.ffProbeData.streams.length; i++) {
 
       try {
         if(file.ffProbeData.streams[i].codec_type.toLowerCase() == "subtitle"){
 
           hasSubs = true
 
         }
       } catch (err) { }
     }

     if(hasSubs){

      response.infoLog += " File has subs"
      response.preset = '-sn, -c:v copy -c:a copy'
      response.reQueueAfter = true;
      response.processFile = true;
      return response

     }else{
      response.infoLog += " File has no subs"
     }


     response.infoLog += " File meets conditions!"
     return response

  }
}

module.exports.details = details;

module.exports.plugin = plugin;
