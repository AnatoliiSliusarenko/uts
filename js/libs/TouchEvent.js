
function RegisterForTap(options) {

    var touchStarted = false,
    currX = 0,
    currY = 0,
    cachedX = 0,
    cachedY = 0;

    $(options.selector).live('touchstart mousedown', function (e) {
        e.preventDefault();
        // caching the current x
        cachedX = e.pageX;
        // caching the current y
        cachedY = e.pageY;
        // a touch event is detected      
        touchStarted = true;
        var element = $(this);
        setTimeout(function () {
            currX = e.pageX;
            currY = e.pageY;
            if ((cachedX === currX) && !touchStarted && (cachedY === currY)) {
                // execute the tap logic
                options.logic({ e: e, element: element });
            }
        }, 300);
    });

    $(options.selector).live('touchend touchcancel mouseup', function (e) {
        e.preventDefault();
        // here we can consider finished the touch event
        touchStarted = false;
    });

    $(options.selector).live('touchmove mousemove', function (e) {
        e.preventDefault();
        if (touchStarted) {
            
        }
    });

    $(options.selector).live('click', function (e) {
        e.preventDefault();
    });
}