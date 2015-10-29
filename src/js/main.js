(function () {
 
    var al = window.open('', 'autoloader', 'width=350, height=450px, location=no');
 
    if (al.autoload) {

        al.foucus();

    } else {

        var d = al.document,
            content = d.createElement('div'),
            script = d.createElement('script');
 
        content.innerHTML = '<style>@@style</style>@@html';
        script.innerHTML  = '@@script';

        d.title = 'Browsync';
        d.body.appendChild(content);
        d.body.appendChild(script);
    }
 
})();
