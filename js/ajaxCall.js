
//POST REQUEST

$(document).ready(function() {
    $('#postMessage').click(function(e) {
        e.preventDefault();

        // Сериализация данных формы
        var formData = $('form').serializeArray();

        // Преобразуем массив в объект
        var jsonData = {};
        $.each(formData, function() {
            jsonData[this.name] = this.value;
        });

        $.ajax({
            type: "POST",
            url: "/api/post/create.php",
            data: JSON.stringify(jsonData),
            contentType: "application/json",

            success: function() {
                alert('Successfully posted');
            },
            error: function() {
                alert('Could not be posted');
            }
        });
    });
});
    


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('getMessage').onclick = function() {
        var req = new XMLHttpRequest();
        req.open("GET", '/api/post/read.php', true);

        req.onload = function() {
            if (req.status >= 200 && req.status < 300) {
                try {
                    var json = JSON.parse(req.responseText);

                    var data = json.filter(function(val) {
                        return val.id >= 4;  
                    });

                    var html = "";

                    data.forEach(function(val) {
                        var keys = Object.keys(val);
                        html += "<div class='cat'>";
                        keys.forEach(function(key) {
                            html += "<strong>" + key + "</strong>: " + val[key] + "<br>";
                        });
                        html += "</div><br>";
                    });

                    var messageElement = document.getElementsByClassName('message')[0];
                    if (messageElement) {
                        messageElement.innerHTML = html;
                    } else {
                        console.error("Element with class 'message' not found");
                    }
                } catch (e) {
                    console.error("Error parsing JSON:", e);
                }
            } else {
                console.error("Request failed with status: " + req.status);
            }
        };

        req.onerror = function() {
            console.error("Request failed due to network error");
        };

        req.send();
    };
});
  
