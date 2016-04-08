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
        return httpGet("https://quizmaker.pythonanywhere.com/api/get_title/"+quiz_id+"/"+question_number);
    };
    ext.get_answers = function(question_number,quiz_id,answer_var) {
        var resp =  httpGet("https://quizmaker.pythonanywhere.com/api/get_answers/"+quiz_id+"/"+question_number);
        resp = resp.split("{{;;}}");
        var output = ""
        var cntr = 0
        resp.forEach(function(entry){cntr = cntr + 1; output=output + "("+String(cntr)+") "+ entry + "\n"});
        return output
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            ['r', 'Get Question Title No. %n of Quiz with id %n', 'get_question_title', 1, 0],
            ["r", "Get Answer Choice Text of question %n of quiz with id %n", "get_answers", 1, 0]
        ],
        url: "http://asapplications.github.io/quizmaker/api_scratch_doc"
    };

    // Register the extension
    ScratchExtensions.register('FameMedia QuizMaker Scratch API', descriptor, ext);
})({});
