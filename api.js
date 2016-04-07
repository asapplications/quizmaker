(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};
    httpGet = function(theUrl) {
         var xmlHttp = new XMLHttpRequest();
         xmlHttp.open("GET",theUrl,false)
         xmlHttp.send("null")
         return xmlHttp.responseText; }
    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_question_title = function(question_number,quiz_id) {
        return httpGet("https://quizmaker.pythonanywhere.com/api/get_title/"+question_number+"/"+quiz_id);
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            ['r', 'Get Question Title No. %n of Quiz with id %n', 'get_question_title', 1, 0],
        ]
    };

    // Register the extension
    ScratchExtensions.register('FameMedia QuizMaker Scratch API', descriptor, ext);
})({});
