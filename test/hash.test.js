
var assert = require('assert');
var fs = require('fs');

suite('grunt-hash', function() {

  suite('php', function() {

    test('assets.php created', function() {
      assert.ok(fs.existsSync('out/assets.php'));
      assert.equal(fs.readFileSync('out/assets.php', 'utf8'), fs.readFileSync('test/fixtures/assets.php', 'utf8'));
    });

    test('files created', function() {
      assert.ok(fs.existsSync('out/dist/php/test1.c6896d8a.js'));
      assert.ok(fs.existsSync('out/dist/php/test2.4be88350.js'));
    });

  });

  suite('json', function() {

    test('assets.json created', function() {
      assert.ok(fs.existsSync('out/assets.json'));
      assert.equal(fs.readFileSync('out/assets.json', 'utf8'), fs.readFileSync('test/fixtures/assets.json', 'utf8'));
    });

    test('files created', function() {
      assert.ok(fs.existsSync('out/dist/json/test1.c6896d8a.js'));
      assert.ok(fs.existsSync('out/dist/json/test2.4be88350.js'));
    });

  });

  suite('basePath', function() {

    test('path.json created', function() {
      assert.ok(fs.existsSync('out/path.json'));
      assert.equal(fs.readFileSync('out/path.json', 'utf8'), fs.readFileSync('test/fixtures/path.json', 'utf8'));
    });

    test('files created', function() {
      assert.ok(fs.existsSync('out/dist/path/test1.c6896d8a.js'));
      assert.ok(fs.existsSync('out/dist/path/test2.4be88350.js'));
      assert.ok(fs.existsSync('out/dist/path/test3.d8cfe155.js'));
    });
  });

  suite('flatten', function() {

    test('flatten.json created', function() {
      assert.ok(fs.existsSync('out/flatten.json'));
      assert.equal(fs.readFileSync('out/flatten.json', 'utf8'), fs.readFileSync('test/fixtures/flatten.json', 'utf8'));
    });

    test('files created', function() {
      assert.ok(fs.existsSync('out/dist/flatten/test1.c6896d8a.js'));
      assert.ok(fs.existsSync('out/dist/flatten/test2.4be88350.js'));
      assert.ok(fs.existsSync('out/dist/flatten/test3.d8cfe155.js'));
    });
    
  });

  suite('no dest', function() {

    test('no_dest.json created', function() {
      assert.ok(fs.existsSync('out/no_dest.json'));
      assert.equal(fs.readFileSync('out/no_dest.json', 'utf8'), fs.readFileSync('test/fixtures/no_dest.json', 'utf8'));
    });

    test('files created', function() {
      assert.ok(fs.existsSync('examples/test1.c6896d8a.js'));
    });
    
  });

  suite('custom hash', function() {

    test('custom_hash.json created', function() {
      assert.ok(fs.existsSync('out/custom_hash.json'));
      assert.equal(fs.readFileSync('out/custom_hash.json', 'utf8'), fs.readFileSync('test/fixtures/custom_hash.json', 'utf8'));
    });

    test('files created', function() {
      assert.ok(fs.existsSync('examples/test1-4750a705.js'));
    });

  });

  suite('comment hash', function() {

    test('comment addded to file', function() {
      assert.ok(fs.existsSync('out/dist/comment/test1.js'));
      assert.equal(fs.readFileSync('out/dist/comment/test1.js', 'utf8'), fs.readFileSync('test/fixtures/comment/comment/test1.js', 'utf8'));
    });
    test('comment with template addded to file', function() {
      assert.ok(fs.existsSync('out/dist/comment_template/test1.js'));
      assert.equal(fs.readFileSync('out/dist/comment_template/test1.js', 'utf8'), fs.readFileSync('test/fixtures/comment/comment_template/test1.js', 'utf8'));
    });

    test('comment with template via function addded to file', function() {
      assert.ok(fs.existsSync('out/dist/comment_template2/test1.js'));
      assert.equal(fs.readFileSync('out/dist/comment_template2/test1.js', 'utf8'), fs.readFileSync('test/fixtures/comment/comment_template2/test1.js', 'utf8'));

      assert.ok(fs.existsSync('out/dist/comment_template2/test2.js'));
      assert.equal(fs.readFileSync('out/dist/comment_template2/test2.js', 'utf8'), fs.readFileSync('test/fixtures/comment/comment_template2/test2.js', 'utf8'));
    });

  });
});
