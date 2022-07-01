let vThree = Vue.createApp({

    data() {
        return {
            Page: false,

            InputFileName: "",
        };
    },


    methods: {
        async exportjsonfile() {
            let Jsons = new Array();

            let Variables = [
                vOne.Tables,
                vOne.FontSize,
                vOne.TextAreas,
                vOne.TheadValue,
                vOne.ChangedTheadValue,
                vOne.TbodyValue,
                vOne.TheadZaehler,
                vOne.InputValueThead
            ];

            Variables.forEach((arrays) => {
                Jsons.push(arrays)
            });

            let dataStr = JSON.stringify(Jsons);

            var myBlob = new Blob([dataStr], {type: "text/plain"});

            const fileHandle = await window.showSaveFilePicker({
                suggestedName: this.InputFileName,
              types: [{
                description: "JSON",
                accept: {"text/plain": [".json"]}
              }]
            });
            const fileStream = await fileHandle.createWritable();

            await fileStream.write(myBlob);
            await fileStream.close();
        },


        importjsonfile: function () {
            var files = document.getElementById('formFile').files;
            if (files.length <= 0) {
                return false;
            }

            var fr = new FileReader();

            fr.onload = function (e) {
                var result = JSON.parse(e.target.result);
                var formatted = JSON.stringify(result, null, 2);
                let JsonImport = JSON.parse(formatted);
                for(i = vOne.Tables; i< JsonImport[0]; i++){
                    vOne.addtable();
                }
                    vOne.FontSize = JsonImport[1];

                    vOne.TextAreas = JsonImport[2];

                    vOne.TheadValue = JsonImport[3];

                    vOne.ChangedTheadValue = JsonImport[4];

                    vOne.TbodyValue = JsonImport[5];

                    vOne.TheadZaehler = JsonImport[6];

                    vOne.InputValueThead = JsonImport[7];

                    vOne.TestValue = JsonImport[8];
                    
                    
            vOne.loadtable();
            vOne.loadthead();
                
            }

            fr.readAsText(files.item(0));

            this.InputFileName = document.getElementById('formFile').files[0].name;

        },

    },

}).mount('#vThree')