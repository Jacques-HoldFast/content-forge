const http = require('http');

const PORT = 3000;
const HOST = 'localhost';

function testEndpoint(path, expectedStatus = 200) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: HOST,
      port: PORT,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      console.log(`${path}: ${res.statusCode} ${res.statusCode === expectedStatus ? '✅' : '❌'}`);
      resolve(res.statusCode === expectedStatus);
    });

    req.on('error', (err) => {
      console.log(`${path}: Error ${err.message} ❌`);
      resolve(false);
    });

    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing Content-Forge Server...\n');
  
  const tests = [
    ['/'],
    ['/api/sites/site1'],
    ['/api/sites/site2'],
    ['/sites/site1'],
    ['/sites/site2']
  ];

  let passed = 0;
  for (const [path, expectedStatus = 200] of tests) {
    const result = await testEndpoint(path, expectedStatus);
    if (result) passed++;
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n📊 Results: ${passed}/${tests.length} tests passed`);
  
  if (passed === tests.length) {
    console.log('🎉 All tests passed! Content-Forge is working correctly.');
  } else {
    console.log('❌ Some tests failed. Check the server logs.');
  }
}

runTests();