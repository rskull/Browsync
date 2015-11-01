(function () {
 
    var bs = window.open('', 'browsync', 'width=350, height=450px, location=no');
 
    if (bs.browsync) {

        bs.foucus();

    } else {

        var d = bs.document,
            content = d.createElement('div'),
            script = d.createElement('script');
 
        content.innerHTML = '<style>@@style</style>@@html';
        script.innerHTML  = '@@script';

        d.title = 'Browsync';
        d.body.appendChild(content);
        d.body.appendChild(script);
    }
 
})();
