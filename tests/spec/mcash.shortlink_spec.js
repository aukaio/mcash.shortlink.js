(function () {
    'use strict';

    describe('mcash.shortlink.js', function () {
        var origAgent = navigator.userAgent,
            newNavigator = Object.create(window.navigator),
            origNavigator,

            setAgentAs = function (name) {
                if (typeof window.phantom !== 'undefined') {
                    newNavigator.userAgent = name;
                    origNavigator = window.navigator;
                    window.navigator = newNavigator;
                } else {
                    navigator.__defineGetter__('userAgent', function(){
                        return name;
                    });
                }
            };

        beforeEach(function () {
            spyOn(mCASH, 'redirect_to');
        });

        afterEach(function () {
            mCASH.kill_redirect();
            $('.test').empty();

            if (navigator.userAgent !== origAgent) {
                if (typeof window.phantom !== "undefined") {
                    window.navigator = origNavigator;
                } else {
                    navigator.__defineGetter__('userAgent', function(){
                        return origAgent;
                    });
                }
            }
        });

        it('provides an mCASH.displayQRorButton function', function () {
            expect(typeof mCASH).toBe('object');
            expect(typeof mCASH.displayQRorButton).toBe('function');
        });

        it('creates a QR code from an id', function () {
            mCASH.displayQRorButton();

            var img = $('#a img[alt="http://mca.sh/s/moo/"]');
            expect(img.length).toBe(1);
        });

        it('creates a QR code from an id and an argstring', function () {
            mCASH.displayQRorButton();

            var img = $('#b img[alt="http://mca.sh/s/moo/far"]');
            expect(img.length).toBe(1);
        });

        it('creates a QR button from an id', function () {
            setAgentAs("iPad");

            mCASH.displayQRorButton();

            var img = $('#a img[alt="http://mca.sh/s/moo/"]'),
                button = $('#a button.paywithmcash');
            expect(img.length).toBe(0);
            expect(button.length).toBe(1);

            button.click();
            expect(mCASH.redirect_to).toHaveBeenCalledWith('mcash://qr?code=http://mca.sh/s/moo/');
        });

        it('creates a QR button from an id and an argstring', function () {
            setAgentAs("iPad");

            mCASH.displayQRorButton();

            var img = $('#b img[alt="http://mca.sh/s/moo/"]'),
                button = $('#b button.paywithmcash');
            expect(img.length).toBe(0);
            expect(button.length).toBe(1);

            button.click();
            expect(mCASH.redirect_to).toHaveBeenCalledWith('mcash://qr?code=http://mca.sh/s/moo/far');
        });

        it('creates a custom shortlink', function () {
            setAgentAs("iPad");

            mCASH.displayQRorButton();

            var img = $('#c img[alt="http://mca.sh/s/foo/"]'),
                button = $('#c button.paywithmcash');
            expect(img.length).toBe(0);
            expect(button.length).toBe(1);

            button.click();
            expect(mCASH.redirect_to).toHaveBeenCalledWith('mcash://qr?code=http://mca.sh/q/foo/');
        });

        it('creates a custom shortlink on Android using Chrome', function () {
            setAgentAs("Chrome on Dalvik");

            mCASH.displayQRorButton();

            var img = $('#c img[alt="http://mca.sh/s/foo/"]'),
                button = $('#c button.paywithmcash');
            expect(img.length).toBe(0);
            expect(button.length).toBe(1);

            button.click();
            expect(mCASH.redirect_to).toHaveBeenCalledWith('intent://qr?code=http://mca.sh/q/foo/#Intent;scheme=mcash;package=no.mcash;end');
        });

        it('creates a custom shortlink on Android using Chrome', function () {
            setAgentAs("Chrome on Dalvik");

            mCASH.displayQRorButton();

            var img = $('#e img[alt="http://mca.sh/s/goo/"]'),
                button = $('#e button.paywithmcash');
            expect(img.length).toBe(0);
            expect(button.length).toBe(1);

            button.click();
            expect(mCASH.redirect_to).toHaveBeenCalledWith('intent://qr?code=http://mca.sh/s/goo/#Intent;scheme=mcash;package=no.mcashtestbed;end');
        });

        it('creates a custom shortlink on Android using Firefox', function () {
            setAgentAs("Firefox on Android");

            mCASH.displayQRorButton();

            var img = $('#c img[alt="http://mca.sh/s/foo/"]'),
                button = $('#c button.paywithmcash');
            expect(img.length).toBe(0);
            expect(button.length).toBe(1);

            button.click();
            expect(mCASH.redirect_to).toHaveBeenCalledWith('mcash://qr?code=http://mca.sh/q/foo/');
        });

        it('creates a custom shortlink on Android using an unknown browser', function () {
            setAgentAs("Servo on Android");

            mCASH.displayQRorButton();

            var img = $('#a img[alt="http://mca.sh/s/moo/"]'),
                button = $('#a button.paywithmcash');
            expect(img.length).toBe(0);
            expect(button.length).toBe(1);

            expect($('iframe[src="mcash://qr?code=http://mca.sh/s/moo/"]').length).toBe(0);
            button.click();
            expect($('iframe[src="mcash://qr?code=http://mca.sh/s/moo/"]').length).toBe(1);
        });
    });

})();
