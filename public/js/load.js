window.loadFiles = [];
window.loadFiles.push(
    // Deps
    '/js/lib/bootstrap.min.js',
    '/js/lib/underscore.min.js',
    '/js/lib/backbone.min.js',
    '/js/lib/jquery.metisMenu.min.js',
    '/js/lib/jquery.slimscroll.min.js',
    '/js/lib/fc.common.min.js',
    /* FelCraft Application Files */
    // Core
    '/js/lib/felcraft-core.min.js',
    // Compiled
    '/js/lib/felcraft-bb.min.js'
);
window.startApp = function() { console.error('Oops! No application got loaded!') };
(function(LazyLoad, files) {
    var len = files.length - 1;
    var incrementBy = Math.floor(100 / ((len + 1) * 2));
    var size = 0;
    var previousMessages = [];
    var transitionTimeout = 300;
    var domReadyTimeout = 25;

    var background = document.getElementById('fc-background');
    var image = document.getElementById('app-bg-load');
    var messages = document.getElementById('app-loading-messages');
    var progress = document.getElementById('app-loading-progress');
    var progressBar = document.getElementById('app-loading-progress-bar');
    var loader = document.getElementById('app-loader');

    messages.style.width = window.outerWidth + 'px';

    window.onresize = function() {
        messages.style.width = window.outerWidth + 'px';
    };

    var loadingMessages = [
        'Slapping Target Dummy',
        'Charging Eye lazers',
        'Power levels surpassing 9000',
        'Gliiiiiiiiiide!',
        'Sharpening glaives',
        'Popping Metamorphosis',
        'Spamming Fel Blade',
        'There is no spoon',
        'Spotting Rogues',
        'Cheesing meters'
    ];

    var finishedMessages = [
        'Welcome to FelCraft'
    ];

    var finish = function() {
        window.setTimeout(function() {
            progress.style.opacity = 0;
        }, 160);

        //window.startApp();

        var msg = document.createElement('div');
        msg.innerHTML = finishedMessages[Math.floor(Math.random() * finishedMessages.length)];
        msg.className = 'app-loading-message transparent';
        var addedMessage = messages.appendChild(msg);

        window.setTimeout(function() {
            addedMessage.style.opacity = 1;
        }, 500);

        window.setTimeout(function() {
            background.style.opacity = 0;
            loader.style.opacity = 0;
            background.style.zIndex = 1;
            document.getElementById('fc-background').style.opacity = 1;
            loadjscssfile("/css/style.min.css","css");  // Temporary CSS injection

            /* INITIALIZE FRONTEND */
            var FelCraft = new window.FC();
                $(this).remove();
                _.extend(window, { FCI: FelCraft });

                // Init the JC Instance
                FelCraft.init({ CDN: '/test', main_ele: '#content' });

                /* Debug logging */
                console.log('Views', FelCraft.view_definitions);
                console.log('Models', FelCraft.model_definitions);
                console.log('Collections', FelCraft.collection_definitions);
                console.log('FC Object', FelCraft);


            window.setTimeout(function() {
                document.body.style.overflow = 'auto';
                loader.remove();
                var elements = document.getElementsByClassName('files-to-load');
                while (elements.length) {
                    elements[0].remove();
                }

                window.startApp = function() {};
                window.startBackground = function() {};
                document.getElementById('app-loading-script').remove();
                window.setTimeout(function() {
                    window.bgPaused = !document.hasFocus();
                }, 150);
            }, transitionTimeout);
        }, 1750);


    };

    var loadjscssfile = function(filename, filetype) {
        if (filetype == "js") {
            var fileref = document.createElement('script')
            fileref.setAttribute("type", "text/javascript")
            fileref.setAttribute("src", filename)
            alert('called');
        } else if (filetype == "css") {
            var fileref = document.createElement("link")
            fileref.setAttribute("rel", "stylesheet")
            fileref.setAttribute("type", "text/css")
            fileref.setAttribute("href", filename)
        }
        if (typeof fileref != "undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref)
    }

    var getMessage = function() {
        return loadingMessages.splice(Math.floor(Math.random() * loadingMessages.length), 1);
    };

    var loadFile = function(index, newMessage, oldMessageIndex) {
        if (typeof oldMessageIndex !== 'undefined') {
            previousMessages[oldMessageIndex].classList.add('hide');
        }

        window.setTimeout(function() {
            var msg = document.createElement('div');
            msg.innerHTML = newMessage;
            msg.className = 'app-loading-message';
            var addedMessage = messages.appendChild(msg);
            var newMessageIndex = previousMessages.push(addedMessage) - 1;

            window.setTimeout(function() {
                addedMessage.classList.add('show');
                size += incrementBy;
                progressBar.style.width = size + '%';

                window.setTimeout(function() {
                    LazyLoad.js(files[index], function() {
                        if (index < len) {
                            // Fill the progress up more
                            size += incrementBy;
                            progressBar.style.width = size + '%';

                            index++;
                            loadFile(index, getMessage(), newMessageIndex);
                        } else {
                            addedMessage.classList.add('hide');
                            progressBar.style.transition = 'all 0.15s linear';
                            progressBar.className = 'bg-success';
                            progressBar.style.width = '100%';
                            finish();
                        }
                    });
                }, transitionTimeout);
            }, domReadyTimeout);
        }, transitionTimeout);
    };

    // Fade in the background image
    image.onload = function() {
        document.getElementById('fc-background').style.backgroundImage = 'url(/img/bg.png)';
        document.getElementById('fc-background').style.opacity = 1;
        image.remove();
    };

    // Start loading the first file
    window.setTimeout(function() {
        loadFile(0, getMessage());
        progress.style.opacity = 1;
    }, domReadyTimeout);
})(LazyLoad, loadFiles);
