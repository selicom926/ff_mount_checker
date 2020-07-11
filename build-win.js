const builder = require('electron-builder');

builder.build({
    config: {
        'appId': 'ff-mount-checker',
        'win':{
            'target': {
                'target': 'zip',
                'arch': [
                    'x64',
                    'ia32',
                ]
            }
        },
        "files": [
          "assets",
          "src",
          "static",
          "package.json",
          "package-lock.json",
        ]
    }
});