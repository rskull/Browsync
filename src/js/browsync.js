/**
 * Browsync
 */

(function (w, d) {

    var $ = function (sec) {
        return d.querySelector(sec);
    }

    var browsync = {}

    browsync.FPS = 250;

    browsync.observer = {

        list: {},

        getFiles: function (e) {
            if (e.target.files) {
                return e.target.files
            } else {
                return e.dataTransfer.files
            }
        },

        addFiles: function (e) {
            var files = this.getFiles(e);
            for (var i = 0; i < files.length; i++) {
                this.enable(files[i]);
            }
        },

        checkPoint: function (file) {
            var point;
            try {
                point = file.lastModifiedDate.toString();
            } catch (e) {
                point = file.getAsBinary();
            }
            return point;
        },

        enable: function (file) {
            var now, before, list = $('#list ul');
            before = this.checkPoint(file);
            this.list[file.name] = setInterval(function () {
                now = browsync.observer.checkPoint(file);
                if (before !== now) {
                    before = browsync.observer.checkPoint(file);
                    w.opener.location.reload()
                }
            }, browsync.FPS);
            var li = d.createElement('li');
            li.addEventListener('click', function () {
                this.parentNode.removeChild(this);
                browsync.observer.remove(file.name);
            }, true);
            list.appendChild(li).innerHTML = file.name;
        },

        remove: function (key) {
            clearInterval(this.list[key]);
            delete this.list[key];
        }

    }

    setInterval(function () {
        if (!w.opener || w.opener.closed) w.close();
    }, 500);

    var input = $('#drop');

    input.addEventListener('dragenter', function (e) {
        e.preventDefault()
    }, true);

    input.addEventListener('dragover', function (e) {
        e.preventDefault()
    }, true);

    input.addEventListener('drop', function (e) {
        browsync.observer.addFiles(e);
        e.preventDefault()
    }, true);

    $('#file').addEventListener('change', function (e) {
        browsync.observer.addFiles(e);
    }, true);

})(window, document);
