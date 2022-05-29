let vThree = Vue.createApp({

    data() {
        return {

        };
    },

    //pre load Funktions
    created() {

    },


    methods: {
        exportjsonfile() {
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

            console.log(dataStr);

            let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

            let exportFileDefaultName = 'data.json';

            let linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        },

        importjsonfile: function () {
            var files = document.getElementById('selectFiles').files;
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
                    console.log(i);
                }
                    vOne.FontSize = JsonImport[1];
                    vOne.TextAreas = JsonImport[2];
                    vOne.TheadValue = JsonImport[3];
                    vOne.ChangedTheadValue = JsonImport[4];
                    vOne.TbodyValue = JsonImport[5];
                    vOne.TheadZaehler = JsonImport[6];
                    vOne.InputValueThead = JsonImport[7];
                    
            vOne.loadtable();
            vOne.loadthead();
                
            }

            fr.readAsText(files.item(0));

        },

    },

}).mount('#vThree')


