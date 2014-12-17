(function () {

    describe('mcash.shortlink.js', function () {

        afterEach(function () {
            $('.test').empty();
        });

        it('provides an mCASH.displayQRorButton function', function () {
            expect(typeof mCASH).toBe('object');
            expect(typeof mCASH.displayQRorButton).toBe('function');
        });

        it('creates a QR code from an id', function () {
            mCASH.displayQRorButton();

            var img = $('#a img[src="https://api.mca.sh/shortlink/v1/qr_image/moo/"]');
            expect(img.length).toBe(1);
        });

        it('creates a QR code from an id and an argstring', function () {
            mCASH.displayQRorButton();

            var img = $('#b img[src="https://api.mca.sh/shortlink/v1/qr_image/moo/far"]');
            expect(img.length).toBe(1);
        });

        it('creates a QR button from an id', function () {
            var userAgent = navigator.userAgent;
            navigator.__defineGetter__('userAgent', function(){
                return 'iPad';
            });

            mCASH.displayQRorButton();

            var img = $('#a img[src="https://api.mca.sh/shortlink/v1/qr_image/moo/"]'),
                button = $('#a button.paywithmcash')
            expect(img.length).toBe(0);
            expect(button.length).toBe(1);

            spyOn(mCASH, 'redirect_to');
            button.click();
            expect(mCASH.redirect_to).toHaveBeenCalledWith("mcash://qr?code=http://mca.sh/s/moo/");
        });

        it('creates a QR button from an id and an argstring', function () {
            var userAgent = navigator.userAgent;
            navigator.__defineGetter__('userAgent', function(){
                return 'iPad';
            });

            mCASH.displayQRorButton();

            var img = $('#b img[src="https://api.mca.sh/shortlink/v1/qr_image/moo/"]'),
                button = $('#b button.paywithmcash')
            expect(img.length).toBe(0);
            expect(button.length).toBe(1);

            spyOn(mCASH, 'redirect_to');
            button.click();
            expect(mCASH.redirect_to).toHaveBeenCalledWith("mcash://qr?code=http://mca.sh/s/moo/far");
        });
    });

})();
