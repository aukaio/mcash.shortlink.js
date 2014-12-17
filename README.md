mcash.shortlink.js
==================

A standalone JavaScript library that helps you display QR-codes or "Pay with mCASH" buttons correctly depending on browser platform.
On a phone a button will be shown, that when pressed opens the mCASH app and makes a call to mCASH.
If the phone does not have mCASH installed the user will be redirected to GooglePlay or AppStore.

This library is distributed with [bower](http://bower.io). In order to install the full package, including JavaScript, CSS, images and fonts use bower:

```
bower install mcash.shortlink.js
```

To serve the code either deploy mcash.shortlink.js or the minified mcash.shortlink.min.js and the assets folder as is.


Example and customization
------------------------
[press here](https://rawgit.com/mcash/mcash.shortlink.js/master/example.html)
You can open this link in on your phone to see how it changes from QR
code to button (or fake your user agent and view on your laptop). Shows examples of customization with alternate look and language variants.


Try the example
-------------
If you have cloned the repository, you can see the example by
```
python -m SimpleHTTPServer
open http://localhost:8000/example.html
```

Test suit
-------
```
bower install
python -m SimpleHTTPServer
open http://localhost:8000/tests/specRunner.html
```
