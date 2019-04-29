import AV from 'leancloud-storage'


var APP_ID = 'jvcNiwfjaLycAigMEADHA9jQ-gzGzoHsz';
var APP_KEY = 'h8dDXoxGfOYld1lYSA2hAmaH';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default {SDK: AV}