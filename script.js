/*  Завдання 1 */

var patterns = {
    
    name: /^[А-ЯІЇЄҐA-Z][а-яіїєґa-z'’-]+ [А-ЯІЇЄҐA-Z]\.[А-ЯІЇЄҐA-Z]\.$/,

    
    birth: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)[0-9]{2}$/,

    
    address: /^м\. [А-ЯІЇЄҐA-Z][а-яіїєґa-z'’-]+$/,

    
    email: /^[A-Za-z]+@[A-Za-z]+\.com$/,

   
    telegram: /^@[A-Za-z]+_[A-Za-z]+$/
};

var labels = {
    name: 'ПІБ',
    birth: 'Дата народження',
    address: 'Адреса',
    email: 'e-mail',
    telegram: 'Telegram'
};

var form = document.getElementById('user-form');
var resultBox = document.getElementById('result');

form.addEventListener('submit', function (event) {
    event.preventDefault();     

    var data = {};
    var hasErrors = false;

    for (var field in patterns) {
        var input = document.getElementById(field);
        var row = input.parentElement;
        var value = input.value.trim();

        data[field] = value;

        if (patterns[field].test(value)) {
            row.classList.remove('error');
        } else {
            row.classList.add('error');   
            hasErrors = true;
        }
    }

    if (hasErrors) {
        resultBox.hidden = true;
        return;
    }

    showInWindow(data);
});


function showInWindow(data) {
    var html = '<!DOCTYPE html><html lang="uk"><head><meta charset="UTF-8">' +
        '<title>Введені дані</title></head>' +
        '<body style="font-family:Arial,sans-serif;margin:20px">' +
        '<h2>Введені дані</h2>';

    for (var field in labels) {
        html += '<p><b>' + labels[field] + ':</b> ' + escapeHtml(data[field]) + '</p>';
    }
    html += '</body></html>';

    var win = window.open('', '_blank', 'width=420,height=360');
    if (win) {
        win.document.write(html);
        win.document.close();
    } else {
       
        resultBox.innerHTML = html.replace(/^.*<h2>/, '<h2>').replace('</body></html>', '');
        resultBox.hidden = false;
    }
}

function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}


/*Завдання 2  */

var SIZE = 6;
var VARIANT = 6;
var grid = document.getElementById('grid');
var palette = document.getElementById('palette');
var cells = [];      // cells[рядок][стовпець]


for (var r = 0; r < SIZE; r++) {
    var tr = document.createElement('tr');
    cells[r] = [];
    for (var c = 0; c < SIZE; c++) {
        var td = document.createElement('td');
        td.textContent = r * SIZE + c + 1;
        tr.appendChild(td);
        cells[r][c] = td;
    }
    grid.appendChild(tr);
}

// клітинка
var activeRow = Math.floor((VARIANT - 1) / SIZE);
var activeCol = (VARIANT - 1) % SIZE;
var active = cells[activeRow][activeCol];
active.classList.add('active');

function randomColor() {
    var hex = '#';
    for (var i = 0; i < 3; i++) {
        var part = Math.floor(Math.random() * 256).toString(16);
        hex += part.length === 1 ? '0' + part : part;
    }
    return hex;
}


active.addEventListener('mouseover', function () {
    active.style.backgroundColor = randomColor();
});


active.addEventListener('click', function () {
    active.style.backgroundColor = palette.value;
});


active.addEventListener('dblclick', function () {
    for (var r = 0; r < SIZE; r++) {
        for (var c = 0; c < SIZE; c++) {
            var number = r * SIZE + c + 1;
            if (number >= VARIANT) {
                cells[r][c].style.backgroundColor = palette.value;
            }
        }
    }
});
