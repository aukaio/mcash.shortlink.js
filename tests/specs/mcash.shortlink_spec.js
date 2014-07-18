(function () {

    describe('mcash.shortlink.js', function () {

        afterEach(function () {
            var sb = document.getElementById('sandbox');
            sb.innerHTML = '';
        });

        it('creates a QR code from an id and an argstring', function () {
            var img;
            img = mCASH.createQRcode('foo', 'bar');
            expect(img.src).toEqual('https://api.mca.sh/shortlink/v1/qr_image/foo/bar')
        });

        it('creates a QR code from an id', function () {
            var img;
            img = mCASH.createQRcode('foo');
            expect(img.src).toEqual('https://api.mca.sh/shortlink/v1/qr_image/foo/')
        });

        it('creates an mCASH button from an id and an argstring', function (done) {
            var btn;

            spyOn(mCASH, 'scan').and.callFake(function (arg) {
                expect(arg).toEqual("http://mca.sh/s/foo/bar")
                done();
            });

            btn = mCASH.createmCASHButton('foo', 'bar');
            btn.click();
        });

        it('creates an mCASH button from an id', function (done) {
            var btn;

            spyOn(mCASH, 'scan').and.callFake(function (arg) {
                expect(arg).toEqual("http://mca.sh/s/foo/")
                done();
            });

            btn = mCASH.createmCASHButton('foo');
            btn.click();
        });

        it('replaces .mcashShortlink elements with qr codes in a browser', function (done) {
            var sb = document.getElementById('sandbox'),
                el = document.createElement('div');
            el.setAttribute('class', 'mcashShortlink');
            el.setAttribute('data-shortlink-id', 'foo');
            el.setAttribute('data-shortlink-argstring', 'bar');

            spyOn(mCASH, 'createQRcode').and.callFake(function (id, argstring) {
                expect(id).toEqual('foo');
                expect(argstring).toEqual('bar');
                done();
                return document.createElement('img');
            });
            sb.appendChild(el);
            mCASH.displayQRorButton();
        });

        it('replaces .mcashShortlink elements with a button in a handheld device', function (done) {
            var sb, el, userAgent;

            sb = document.getElementById('sandbox'),
            el = document.createElement('div');
            el.setAttribute('class', 'mcashShortlink');
            el.setAttribute('data-shortlink-id', 'foo');
            el.setAttribute('data-shortlink-argstring', 'bar');

            userAgent = navigator.userAgent;
            navigator.__defineGetter__('userAgent', function(){
                return 'iPad';
            });

            spyOn(mCASH, 'createmCASHButton').and.callFake(function (id, argstring) {
                expect(id).toEqual('foo');
                expect(argstring).toEqual('bar');
                navigator.__defineGetter__('userAgent', function(){
                    return userAgent;
                });
                done();
                return document.createElement('button');
            });
            sb.appendChild(el);
            mCASH.displayQRorButton();
        });

    });

})();