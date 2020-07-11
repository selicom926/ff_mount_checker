const fs = require('fs');
new Vue({
    el: '#app',
    data: {
        allMounts: [],
        mounts: [],
        selectKind: 'all',
        kinds: ['all'],
        filePath: path.join(__dirname, '../static/json/myMonunts.json'),
        tempolaryFilePath: path.join(__dirname, '../../myMonunts.json'),
    },
    mounted: function(){
        let data = null;

        try {
            data = fs.readFileSync(this.tempolaryFilePath, 'utf-8');
        } catch (e) {
            alert("初回起動のため空ファイルをロードします");
            // throw
        }

        if (!data) {
            try {
                data = fs.readFileSync(this.filePath, 'utf-8');
            } catch(e) {
                alert("file open error.");
                return;
            }
        }

        this.allMounts = JSON.parse(data.toString());

        this.mounts = this.allMounts;
        const kinds = ['all'];
        this.mounts.forEach(data => {
            if (!kinds.includes(data.kind)) {
                kinds.push(data.kind);
            }
        });
        this.kinds = kinds;

        // fs.readFile(this.tempolaryFilePath, (error, data) => {
        //     if (error != null) {
        //         alert(error);
        //         alert("file open error.");
        //         return;
        //     }
        //     this.allMounts = JSON.parse(data.toString());

        //     this.mounts = this.allMounts;
        //     const kinds = ['all'];
        //     this.mounts.forEach(data => {
        //         if (!kinds.includes(data.kind)) {
        //             kinds.push(data.kind);
        //         }
        //     });
        //     this.kinds = kinds;
        // })
    },
    methods: {
        onChange: function() {
            if (this.selectKind === 'all') {
                this.mounts = this.allMounts
            } else {
                const mounts = this.allMounts.filter(mount => mount.kind === this.selectKind);
                this.mounts = mounts;
            }
        },

        onSaveClick: function() {
            fs.writeFile(this.tempolaryFilePath, JSON.stringify(this.allMounts), (error) => {
                if (error != null) {
                    alert("save error.");
                    return;
                } else {
                    alert("save done");
                }
            })
        }
    }

})